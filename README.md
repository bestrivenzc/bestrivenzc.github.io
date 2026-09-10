# Personal Academic Homepage

This is a lightweight static academic homepage. It can be uploaded directly to a GitHub Pages repository such as `USERNAME.github.io`.

## Files

- `index.html`: the homepage structure.
- `assets/css/style.css`: visual style and responsive layout.
- `assets/js/site.js`: renders profile data into the page.
- `assets/js/icons.js`: local Lucide icons for the profile links (license in `assets/licenses/lucide.txt`).
- `data/profile.js`: main editable content.
- `assets/img/avatar-seaside.jpg`: your profile photograph, displayed with a responsive circular crop in CSS. The original image is unchanged.
- `assets/img/papers/`: place publication figures here.
- `PUBLICATION_SOURCES.md`: publication sources, date conventions, and image status.

## Edit Your Information

Most updates only require editing `data/profile.js`.

Recommended fields to update:

- `name`, `role`, `affiliation`, `location`
- `sidebarBio`: the short research introduction beneath your profile details
- `showMetrics`: set to `true` to display the saved citation statistics; hidden by default
- `links`, especially GitHub, Email, and CV
- `researchInterests`
- `aboutHtml` (displayed biography, including advisor links); `about` is the plain-text fallback
- `news`
- `featuredPublications` and `publications`: the eight illustrated publication records
- `additionalPublications`: records shown only in the complete compact list
- `services` and `misc`

For an email link, use this format:

```js
{ label: "Email", url: "mailto:your.name@example.com" }
```

The `featuredPublications` and `publications` arrays provide the image-and-text entries. A compact, bulleted bibliography below them combines these records with `additionalPublications`, so existing titles, authors, and links have only one source. Both displays put first-author papers first, then other collaborations. Within each group, papers are sorted by `year` in descending order; ties keep their existing order. Your name is bold and underlined in both displays. Set `year` to the journal issue, conference edition, or preprint year shown in `venue`. For an illustrated publication, use this format:

```js
{
  id: "paper-short-name",
  title: "Paper Title",
  venue: "CVPR 2026",
  year: 2026,
  badge: "CVPR 2026",
  authors: "Your Name, Collaborator A, Collaborator B",
  meta: "Proceedings of CVPR, pp. 1-10, 2026.",
  url: "https://example.com/paper.pdf",
  image: "assets/img/papers/paper-short-name.png",
  imageAlt: "Overview of the proposed method",
  imageWidth: 1600,
  imageHeight: 900,
  highlights: ["First research contribution.", "Second research contribution."],
  links: [
    { label: "Paper", url: "https://example.com/paper.pdf" },
    { label: "Code", url: "https://github.com/username/repo" }
  ]
}
```

When both `image` and `video` are empty, a blank figure area is reserved. To add an image, place your PNG/JPG/WebP/GIF file in `assets/img/papers/` and set `image` to its relative path. Set `imageWidth` and `imageHeight` to the original pixel dimensions to reserve the correct space before loading. Figures are shown in full without cropping, with venue badges above the media so they do not cover figure annotations. `imageSource` and `videoSource`, where present, record source URLs only; they do not load external media.

EVDI++ uses a gently cropped two-column fire video from the first example in the project's final BS-ERGB section: LFR on the left and the 500-times EVDI++ result on the right. The wider framing preserves the original Start Frame / End Frame text and right-hand frame counter while removing some peripheral background and the middle 50-times column. Playback speed and frame count are unchanged. The active file is `assets/img/papers/evdi-plus-plus-fire-focus.mp4` (1040 x 380, about 20 seconds), with a matching `.jpg` preview. Keep both files when uploading the homepage. The original and earlier edits are retained as unused source copies. For video figures, set `video`, `videoAlt`, `videoWidth`, and `videoHeight` in the paper record; `videoPoster` and `videoLabels` are optional. Video takes precedence over `image`, preserves its aspect ratio, and has native playback/fullscreen controls. It loops silently and requests autoplay, except when reduced motion is enabled; browsers may still require pressing play.

News records have `date`, `title`, `url`, `text`, and an optional `congrats` field. Dates use `YYYY.MM`; verify the month before adding an item. Each `congrats` field contains one collaborator's name, for example `congrats: "Mingyuan Lin"` displays "Congrats to Mingyuan Lin!". Omit `congrats` for your own first-author papers. Use "is accepted by" only for confirmed acceptance dates, and "is published in" for publication dates.

CrossZoom uses `assets/img/papers/crosszoom-gopro1.mp4` and its matching `.jpg` preview: the first video under More Results on the project page, supplied locally by the user. The full 1424 x 720 video is preserved without re-encoding or cropping. Five other papers use user-supplied screenshots, and BRS-E2NeRF uses the publisher's graphical abstract. See `assets/img/papers/README.md` for the mapping.

The upper publication display contains 8 records from 2024 onward, all with local media. The complete list below it contains all 19 records in the user's Scholar screenshots, spanning 2016-2026. This includes the ECCVW 2024 paper, both standalone arXiv 2024 preprints, and eight earlier papers; these 11 records appear only in the compact list. They do not restore removed figures or old News entries. The compact format uses a blue venue/year badge, linked title, full authors, and bracketed resource links. Project links are labeled Website; redundant DOI buttons are omitted. No equal-contribution or corresponding-author symbols are inferred.

For a compact-only paper, add an `additionalPublications` object with `id`, `title`, `venue`, `badge`, `year`, `authors`, `url`, and `links`. No image or highlights are needed. Do not duplicate an illustrated entry in this array.

News contains 8 updates, including the September 2025 General Program grant (77th batch) from the China Postdoctoral Science Foundation. The Services section displays Conference Reviewer and Journal Reviewer as stacked lists. Conference items are strings; journal items are objects with `label` and `url` fields.

The Misc section contains a simple personal-interest list and an attributed quotation. Edit `misc.itemsHtml` for the trusted, locally maintained interest descriptions and links. Edit `misc.quote` for the short excerpt, author, author link (`authorUrl`), and quotation source (`url`). The current content covers Bruce Lee, his films, and Shannon Lee's book.

The profile sidebar currently includes the user-provided public email `zhangchi1@whu.edu.cn`, Google Scholar, and ORCID `0000-0002-4174-3201`. Links with an empty `url` remain hidden. Optional link icons are `Mail`, `GraduationCap`, `IdCard`, `FileText`, and `Link`.

Open `index.html` directly to preview the site. No build tools or local server are required. Keep the entire directory structure when uploading.

## Publish On GitHub Pages

1. Create a repository named `USERNAME.github.io`.
2. Upload all files in this folder to that repository.
3. In GitHub, open Settings > Pages and publish from the `main` branch root.

## Notes

The page was modeled after the structure of Xiang Zhang's homepage: a profile sidebar plus sections for About, News, Publications, Services, and Misc. Publication entries were filled from the provided Google Scholar screenshots and cross-checked with public DOI/arXiv metadata where available.
