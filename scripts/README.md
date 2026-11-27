# Build tools

[Home](../README.md) · [Repository map](../docs/REPOSITORY_MAP.md)

## Standalone HTML

From the repository root:

```sh
python3 scripts/build-single.py
```

The script reads the modular editor files and produces:

- `dist/easy-home-3d.html`: self-contained browser editor.
- `dist/easy-home-3d-convika.zip`: ZIP containing the bundled `index.html`.

This is a build tool, not an installer. The current source editor can run directly from the extracted repository. Check the generated bundle and its compatibility before publishing. The checked-in standalone snapshot and modular source reconciliation are tracked in [#42](https://github.com/loktoto/Easy3DHomeModel/issues/42).
