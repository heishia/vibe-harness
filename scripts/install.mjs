#!/usr/bin/env node
/**
 * 프로젝트 루트의 .cursor 를 이 패키지의 .cursor 로 연결한다.
 * - git submodule: <project>/vibe-harness
 * - npm/pnpm git 의존성: <project>/node_modules/vibe-harness
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const harnessRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cursorSrc = path.join(harnessRoot, ".cursor");

function resolveProjectRoot() {
  const parent = path.dirname(harnessRoot);
  if (path.basename(parent) === "node_modules") {
    return path.dirname(parent);
  }
  return parent;
}

function isLinkTo(dest, src) {
  try {
    const stat = fs.lstatSync(dest);
    if (stat.isSymbolicLink()) {
      return path.resolve(path.dirname(dest), fs.readlinkSync(dest)) === path.resolve(src);
    }
  } catch {
    return false;
  }
  return false;
}

function linkWindowsJunction(dest, src) {
  execFileSync("cmd.exe", ["/c", "mklink", "/J", dest, src], {
    stdio: "inherit",
  });
}

const projectRoot = resolveProjectRoot();
const cursorDest = path.join(projectRoot, ".cursor");
const inNodeModules = path.basename(path.dirname(harnessRoot)) === "node_modules";

if (!inNodeModules && path.resolve(process.cwd()) === path.resolve(harnessRoot)) {
  console.log("vibe-harness 레포 안에서는 .cursor를 연결하지 않습니다.");
  process.exit(0);
}

if (!fs.existsSync(cursorSrc)) {
  console.error(`하네스 .cursor 가 없습니다: ${cursorSrc}`);
  process.exit(1);
}

if (path.resolve(projectRoot) === path.resolve(harnessRoot)) {
  console.error("프로젝트 루트를 찾지 못했습니다. submodule 또는 node_modules 아래에 두고 다시 실행하세요.");
  process.exit(1);
}

if (fs.existsSync(cursorDest)) {
  if (isLinkTo(cursorDest, cursorSrc)) {
    console.log(`.cursor 이미 연결됨 → ${cursorSrc}`);
    process.exit(0);
  }
  console.error(
    `이미 ${cursorDest} 가 있습니다. 지운 뒤 다시 실행하거나, 기존 룰과 수동으로 합치세요.`,
  );
  process.exit(1);
}

if (os.platform() === "win32") {
  linkWindowsJunction(cursorDest, cursorSrc);
} else {
  fs.symlinkSync(cursorSrc, cursorDest, "dir");
}

console.log(`연결: ${cursorDest} → ${cursorSrc}`);
console.log(`프로젝트: ${projectRoot}`);
