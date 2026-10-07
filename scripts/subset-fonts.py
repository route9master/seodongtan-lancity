"""Pretendard 서브셋 — 사이트 소스에 쓰인 글자만 남김.
사용: python scripts/subset-fonts.py <Pretendard woff2 폴더>
문구 수정 후 새 한글이 생기면 다시 실행할 것."""
import pathlib, sys, subprocess

src = pathlib.Path(__file__).resolve().parents[1] / "src"
out = pathlib.Path(__file__).resolve().parents[1] / "public" / "fonts"
fontdir = pathlib.Path(sys.argv[1])
chars = set()
for f in src.rglob("*.ts*"):
    chars |= set(f.read_text(encoding="utf-8"))
chars |= set(chr(c) for c in range(0x20, 0x7F))
chars |= set("·–—‘’“”※㎡→←…|")
text = "".join(sorted(c for c in chars if c.isprintable()))
out.mkdir(parents=True, exist_ok=True)
(out / "subset-chars.txt").write_text(text, encoding="utf-8")
for w in ["Light", "Regular", "Medium", "SemiBold"]:
    subprocess.run([sys.executable, "-m", "fontTools.subset", str(fontdir / f"Pretendard-{w}.woff2"),
                    f"--text-file={out / 'subset-chars.txt'}", "--flavor=woff2", "--layout-features=*",
                    f"--output-file={out / f'Pretendard-{w}.subset.woff2'}"], check=True)
print(len(text), "glyphs")
