# Publication Figures

All eight publications now have local media. Keep each referenced image, video, and preview when uploading the homepage.

EVDI++ uses `evdi-plus-plus-fire-focus.mp4` and its `.jpg` preview. The source is the first fire-scene result in the final BS-ERGB section of https://bestrivenzc.github.io/EVDI-plus-plus/. The edit gently crops the LFR and 500-times columns, retaining the original Start Frame / End Frame text and the right-hand frame counter. All 607 frames and about 20 seconds of playback are retained. The output is 1040 x 380. Short HTML labels identify LFR and Ours (500x). The original MP4 and earlier edits remain unused source copies.

CrossZoom uses `crosszoom-gopro1.mp4` and its `.jpg` preview. This is the first More Results video from https://bestrivenzc.github.io/CZ-Net/, supplied by the user as `video_show_all_GOPRO1.mp4`. The full 1424 x 720, approximately 12-second video and all original labels are retained. The video stream is copied without re-encoding into a fast-start MP4 for web playback.

| Paper | Image | Source |
| --- | --- | --- |
| SE-SRB, AAAI 2026 | `se-srb.png` | User screenshot 1, unchanged |
| Cross-modal Optical Flow, SP 2024 | `cross-modal-flow.png` | User screenshot 2, unchanged |
| Learning Parallax, TCSVT 2025 | `learning-parallax.png` | User screenshot 4, unchanged |
| Neuromorphic Shutter, TPAMI 2025 | `neuromorphic-shutter.png` | User screenshot 5, unchanged |
| Depth From Focus, Sensors J. 2025 | `depth-from-focus.png` | User screenshot 6, unchanged |
| BRS-E2NeRF, PR 2026 | `brs-e2nerf.jpg` | Publisher graphical abstract |

Screenshot 3 is not used because both arXiv 2024 papers were removed from the illustrated display, along with the ECCVW 2024 paper. These records now appear only in the complete compact bibliography, without figures.

Use the publication `id` as a filename, for example `evdi-plus-plus.png`, `crosszoom.png`, or `se-srb.png`. Set the corresponding `image` value in `data/profile.js` to `assets/img/papers/your-file.png`.

The layout keeps the whole figure visible with `object-fit: contain` and natural image proportions. Set `imageWidth` / `imageHeight` to the source dimensions. Venue badges are positioned above the media, outside the original annotations. Blank or unavailable images retain their space without a broken-image icon.

For MP4 figures, set `video` to the relative file path, `videoAlt` to a short description, and `videoWidth` / `videoHeight` to the output dimensions. Optional `videoPoster` points to a still preview, and `videoLabels` contains the short column labels. Video figures have playback controls, loop silently, and request autoplay unless reduced motion is enabled.
