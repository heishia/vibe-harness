#!/usr/bin/env node
/**
 * 항상 프로젝트 루트의 .cursor 를 연결한다.
 * pnpm은 실제 파일이 .pnpm 아래에 있으므로, 연결 대상은
 * node_modules/vibe-harness/.cursor (패키지 이름 경로)를 우선한다.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const harnessRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function pathHasNodeModules(dir) {
  return dir.split(path.sep).includes("node_modules");
}

function resolveProjectRoot() {
  let dir = path.dirname(harnessRoot);
  while (true) {
    if (!pathHasNodeModules(dir)) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return dir;
    }
    dir = parent;
  }
}

function firstExisting(paths) {
  return paths.find((p) => fs.existsSync(p));
}

function resolveCursorSrc(projectRoot) {
  return firstExisting([
    path.join(projectRoot, "node_modules", "vibe-harness", ".cursor"),
    path.join(projectRoot, "vibe-harness", ".cursor"),
    path.join(harnessRoot, ".cursor"),
  ]);
}

function real(p) {
  try {
    return fs.realpathSync(p);
  } catch {
    return null;
  }
}

function isHarnessCursorDir(dir) {
  const resolved = real(dir);
  if (!resolved) return false;
  const normalized = resolved.replaceAll("\\", "/").toLowerCase();
  return normalized.includes("/vibe-harness/") && normalized.endsWith("/.cursor");
}

function isLinkTo(dest, src) {
  const a = real(dest);
  const b = real(src);
  return Boolean(a && b && a === b);
}

function removeJunctionOrSymlink(dest) {
  if (os.platform() === "win32") {
    execFileSync("cmd.exe", ["/c", "rmdir", dest], { stdio: "inherit" });
    return;
  }
  fs.unlinkSync(dest);
}

function createLink(dest, src) {
  if (os.platform() === "win32") {
    execFileSync("cmd.exe", ["/c", "mklink", "/J", dest, src], {
      stdio: "inherit",
    });
    return;
  }
  fs.symlinkSync(src, dest, "dir");
}

const inNodeModules = pathHasNodeModules(harnessRoot);

if (
  !inNodeModules &&
  path.resolve(process.cwd()) === path.resolve(harnessRoot)
) {
  console.log("vibe-harness 레포 안에서는 .cursor를 연결하지 않습니다.");
  process.exit(0);
}

const projectRoot = resolveProjectRoot();
const cursorSrc = resolveCursorSrc(projectRoot);
const cursorDest = path.join(projectRoot, ".cursor");

if (!cursorSrc) {
  console.error("하네스 .cursor 를 찾지 못했습니다.");
  process.exit(1);
}

if (path.resolve(projectRoot) === path.resolve(harnessRoot)) {
  console.error(
    "프로젝트 루트를 찾지 못했습니다. submodule 또는 패키지로 붙인 뒤 실행하세요.",
  );
  process.exit(1);
}

if (fs.existsSync(cursorDest)) {
  if (isLinkTo(cursorDest, cursorSrc)) {
    console.log(`.cursor 이미 프로젝트 루트에 연결됨`);
    console.log(`프로젝트: ${projectRoot}`);
    console.log(`대상: ${cursorSrc}`);
    process.exit(0);
  }

  const stat = fs.lstatSync(cursorDest);
  const canReplace =
    isHarnessCursorDir(cursorDest) || stat.isSymbolicLink();

  if (!canReplace) {
    console.error(
      `이미 ${cursorDest} 가 있습니다. 하네스 연결이 아니면 지우지 않습니다.`,
    );
    process.exit(1);
  }

  removeJunctionOrSymlink(cursorDest);
}

createLink(cursorDest, cursorSrc);

console.log(`연결: ${cursorDest} → ${cursorSrc}`);
console.log(`프로젝트: ${projectRoot}`);
