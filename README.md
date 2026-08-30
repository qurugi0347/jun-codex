# jun-codex

개인 Codex 설정을 `~/.codex`에서 바로 Git으로 관리하는 저장소입니다.

## 구조

```text
~/.codex/
├── AGENTS.md
└── skills/
    └── <SkillName>/
        ├── SKILL.md
        ├── references/
        ├── assets/
        └── agents/
```

`src`, `templates`, npm package, 설치 CLI는 사용하지 않습니다. Git이 설치와 업데이트를 대신합니다.

## 새 환경에서 사용

```bash
git clone git@github.com:qurugi0347/jun-codex.git ~/.codex
```

Codex가 만든 인증, 세션, DB, 캐시 파일은 `.gitignore`로 제외됩니다. `AGENTS.md`와 `skills/`만 저장소에서 관리합니다.

## 기존 `~/.codex` 전환

Codex를 종료한 뒤 기존 데이터를 백업하고 저장소를 받은 다음, 런타임 데이터와 로컬 skill을 다시 합칩니다.

```bash
codex_backup="$HOME/.codex.backup.$(date +%Y%m%d-%H%M%S)"
mv "$HOME/.codex" "$codex_backup"
git clone git@github.com:qurugi0347/jun-codex.git "$HOME/.codex"
rsync -a \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='README.md' \
  --exclude='AGENTS.md' \
  --exclude='skills/' \
  "$codex_backup/" "$HOME/.codex/"
rsync -a --ignore-existing "$codex_backup/skills/" "$HOME/.codex/skills/"
git -C "$HOME/.codex" status
```

기존 관리 파일은 저장소 버전을 유지하고, 저장소에 없는 로컬 skill만 추가됩니다. 백업은 새 환경이 정상 동작하고 필요한 변경을 옮긴 뒤 직접 정리합니다.

## 업데이트와 저장

```bash
git -C ~/.codex pull --ff-only

git -C ~/.codex status
git -C ~/.codex add AGENTS.md skills
git -C ~/.codex commit -m "CHORE: Codex 설정 갱신"
git -C ~/.codex push
```

민감한 런타임 파일이 포함되지 않도록 `git add -A` 대신 관리할 경로를 명시합니다. Codex 기본 skill인 `skills/.system/`은 추적하지 않습니다.
