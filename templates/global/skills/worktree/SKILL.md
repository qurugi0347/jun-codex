---
name: worktree
description: Git 저장소에서 base branch를 동기화하고 TASK 작업용 새 worktree를 생성할 때 사용한다. 기존 `.codex` 하위 내용과 로컬 `.env` 설정을 안전하게 복사하고 의존성 설치와 작업 상태를 검증한다.
---

# Worktree

작업용 worktree를 빠르게 준비하고 기존 작업 상태와 민감한 로컬 설정을 보존한다.

## 입력 해석

- 사용자가 `feature/coupon에서 pull 받고 TASK 5 작업 준비해줘`처럼 요청하면 base branch와 TASK 번호를 추출한다.
- 사용자가 새 branch 이름을 지정하지 않으면 영문 소문자와 하이픈으로 정규화한 `feature/task-<번호>` 형식으로 생성한다. 예: `feature/task-5`.
- 사용자가 worktree 경로를 지정하지 않으면 현재 저장소와 같은 부모 디렉터리에 `<저장소명>-<branch-slug>` 경로를 사용한다.
- base branch, 새 branch, worktree 경로가 이미 사용 중이면 기존 worktree나 branch를 덮어쓰지 않고 충돌 내용을 보고한다.

## 작업 흐름

### 1. Source worktree와 현재 상태 확인

- 요청을 받은 현재 디렉터리를 source worktree로 사용하고 `git rev-parse --show-toplevel`로 저장소 루트를 확인한다.
- 현재 디렉터리가 저장소 밖이거나 source 후보 worktree가 여러 개면 복사 원본을 임의로 고르지 말고 사용자에게 source 경로를 확인한다.
- `git status --short --branch`, `git branch --show-current`, `git worktree list`로 현재 저장소와 worktree 상태를 확인한다.
- 기존 변경사항은 사용자의 작업으로 취급하고 보존한다. `reset`, 강제 checkout, 강제 stash, force push를 준비 과정에 사용하지 않는다.
- 대상 경로의 `AGENTS.md`와 저장소 루트의 추가 지침을 먼저 확인한다.

### 2. Base branch 동기화

- `git fetch origin <base-branch>`로 remote 상태를 확인한다.
- 현재 worktree가 base branch이고 working tree가 깨끗하면 `git pull --ff-only origin <base-branch>`로 fast-forward만 수행한다.
- base branch가 다른 worktree에서 사용 중이면 기존 worktree를 전환하지 않는다. `origin/<base-branch>`를 기준으로 새 worktree를 만든다.
- 현재 worktree가 base branch이지만 working tree가 dirty하면 pull하지 않는다. 변경사항을 보존한 채 fetch하고 `origin/<base-branch>`를 기준으로 새 worktree를 만든 뒤 local 변경을 보고한다.
- local base branch에 remote에 아직 push하지 않은 commit이 있거나 local과 remote가 diverge하면 해당 commit을 버리지 않고 생성 기준을 사용자에게 확인한다.
- remote와 branch를 확인할 수 없으면 생성 전에 원인과 필요한 결정을 보고한다.

### 3. 새 worktree 생성

- 새 branch와 경로가 사용되지 않는지 확인한다.
- 동기화한 `origin/<base-branch>` 또는 검증된 local base ref에서 새 branch를 만든다.
- 기본 명령 형태는 다음과 같다.

```bash
git worktree add -b <new-branch> <worktree-path> origin/<base-branch>
```

- 이미 존재하는 branch를 재사용해야 하면 새 branch를 만들지 않고, 해당 branch가 다른 worktree에서 사용 중인지 확인한 뒤 명시적으로 지정한다.
- worktree 생성 후에는 새 경로를 기준으로 모든 후속 복사와 명령을 실행한다.

### 4. `.codex` 복사

- source worktree의 `.codex` 디렉터리가 있으면 하위 파일과 숨김 파일을 모두 새 worktree의 `.codex`로 복사한다.
- `.codex/plan`, context, checklist, 로컬 작업 메모리 등 기존 작업을 이어가는 데 필요한 내용을 보존한다.
- 대상 `.codex`가 이미 존재하면 파일별 비교 후 동일 파일은 유지하고 충돌 파일은 덮어쓰기 전에 보고한다.
- 복사 과정에서 문서 내용, token, secret을 명령 출력이나 최종 응답에 표시하지 않는다.

```bash
mkdir -p <worktree-path>/.codex
cp -R <source-worktree>/.codex/. <worktree-path>/.codex/
```

### 5. `.env` 설정 복사

- 새 worktree에 Git으로 checkout되는 tracked 환경 파일은 branch checkout 결과를 우선 사용한다.
- source에 있는 local-only 또는 ignored 환경 파일을 상대 경로 그대로 복사한다. 대상에는 하위 디렉터리를 포함한 모든 `.env`, `.env.*`, `.envrc` 파일이 포함되며, 예시·템플릿 파일은 제외한다.
- `.env.example`, `.env.sample`, `.env.template`은 문서용 파일이므로 별도 secret 복사 대상으로 취급하지 않는다.
- `.envrc`를 복사하더라도 내용을 자동 실행하지 않고, 새 worktree에서 실행이 필요한지 별도로 확인한다.
- `.env` 파일의 값은 읽거나 출력하지 않고 파일 존재 여부, 상대 경로, 복사 결과만 확인한다.
- 대상에 같은 경로의 파일이 이미 있으면 내용 덮어쓰기 전에 차이를 확인하고 사용자 결정을 요청한다.
- 저장소 밖을 가리키는 symlink나 확인할 수 없는 환경 파일은 복사하지 말고 경로와 사유만 보고한다.
- 복사 대상의 확장자나 이름이 프로젝트별 추가 규칙으로 제외되어 있으면 그 규칙을 먼저 확인하고 제외 목록을 보고한다.

```bash
find <source-worktree> \
  -path '<source-worktree>/.git' -prune -o \
  -path '*/node_modules' -prune -o \
  -type f \( -name '.env' -o -name '.env.*' -o -name '.envrc' \) \
  ! -name '.env.example' ! -name '.env.sample' ! -name '.env.template' ! -name '.envrc.example' \
  -print
```

### 6. 의존성과 작업 준비

- 새 worktree에서 lockfile과 package manager를 확인한다.
- `pnpm-lock.yaml`이면 `pnpm install --frozen-lockfile`, `yarn.lock`이면 `yarn install --immutable`, `package-lock.json`이면 `npm ci`를 우선 사용한다.
- `node_modules`나 build 산출물을 source worktree에서 복사하지 않는다.
- 의존성 설치가 환경 변수나 외부 서비스에 의존하면 필요한 조건을 확인하고 실패 원인을 기록한다.
- 사용자가 요청하지 않은 기능 구현, commit, push, migration 실행은 작업 준비에 포함하지 않는다.

## 완료 검증

- `git -C <worktree-path> status --short --branch`로 새 branch와 변경 상태를 확인한다.
- `git -C <worktree-path> branch --show-current`가 기대한 작업 branch인지 확인한다.
- `git worktree list`에 새 경로와 branch가 등록되었는지 확인한다.
- `.codex` 파일 복사 결과와 `.env` 파일 복사 결과를 값 노출 없이 확인한다.
- lockfile 기준 의존성 설치 결과와 프로젝트에서 가장 가까운 준비 검증 명령을 실행한다.

## 오류와 안전 규칙

- 기존 branch, worktree, `.codex`, `.env` 파일을 삭제하거나 강제로 덮어쓰지 않는다.
- source working tree의 변경사항을 새 branch에 자동으로 commit하거나 stash하지 않는다.
- `.env` 값, 인증 token, password, 개인정보는 로그·응답·commit에 남기지 않는다.
- 복사할 설정이 없으면 없다고 보고하고, 예시 파일만 있으면 tracked branch checkout으로 충분하다고 설명한다.
- 작업 준비가 완료되면 base ref, 새 branch, worktree 절대 경로, 복사한 설정의 종류, 검증 결과, 남은 주의사항을 요약한다.

## 요청 예시

```text
$worktree feature/coupon에서 pull 받고 TASK 5 작업 준비해줘
```

이 요청은 `feature/coupon`을 base로 동기화하고 `feature/task-5` worktree를 만든 뒤, source의 `.codex`와 local-only `.env` 설정을 안전하게 복사하고 의존성·branch 상태를 검증하는 흐름으로 처리한다.
