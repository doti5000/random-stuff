# Git Workflow Rules

- **NEVER** use `git add -f` or `--force` to add ignored files to the repository.
- **CRITICAL**: The file `no-ai-badge-embed/create_embed.ps1` is highly sensitive (contains source obfuscator logic/keys). It must **NEVER** be committed or force-added to the repository.
- If a file needs to be committed but is ignored, modify the `.gitignore` to explicitly allow it, or confirm with the user before proceeding.
