# jiteshmehta-site
Website for JM Enterprise Transformation Advisor

## What this is

The one page website for JM Enterprise Transformation Advisory (JM ETA), live at https://jiteshmehta.in. It is plain HTML and CSS. There is no build step, no JavaScript, no tracking and no cookies. It is hosted free on GitHub Pages from the root of the `main` branch.

## What is in this folder

| File or folder | What it is |
| --- | --- |
| `index.html` | The page itself: all the wording and the document cards. |
| `styles.css` | The colours, fonts and layout. |
| `404.html` | The page shown when someone follows a broken link. |
| `downloads/` | The PDFs visitors can download. |
| `logo/` | The JM logo and the portrait used on the page. |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | The small JM icon shown in browser tabs and on phone home screens. |
| `og-image.png` | The preview picture shown when the link is shared on LinkedIn. |
| `robots.txt`, `sitemap.xml` | Tell search engines what is on the site. |
| `CNAME` | Tells GitHub Pages that the site's address is jiteshmehta.in. Do not delete or edit it. |

## How to add a new document

The easy way: open this project in Claude and say **"add this new document to the site"**. Claude does the steps below for you.

To do it by hand:

1. **Name the PDF** using the pattern `JM_ETA_Title_Words.pdf`. No version numbers and no years in the file name, so links that people have already shared never break. If the edition or date matters, put it in the text on the page, not in the file name.
2. **Check the contact details inside the PDF.** Every document must show only `jitesh@jiteshmehta.in` and `jiteshmehta.in`. Check this every time.
3. **Copy the PDF** into the `downloads` folder.
4. **Open `index.html`** and find the comment headed `CARD TEMPLATE: HOW TO ADD A NEW DOCUMENT`. Copy the block between the two dotted lines.
5. **Paste it** just above the line that says `ADD NEW DOCUMENT CARDS HERE`.
6. **Change the marked lines**: the type label, the title, the one line description, the detail line (for example `PDF, 4 pages`) and the link to the file. Then delete the `[EDIT ...]` notes.
7. **Update `sitemap.xml`**: copy one of the existing PDF lines and change the file name to the new one.
8. **Publish**: commit and push to the `main` branch. The live site updates in a minute or two.

To replace a document with a newer edition, save the new PDF over the old one using exactly the same file name. No other change is needed.

When the list grows past six documents, move the cards to their own resources page using the same card design.

## Domain and email: what must never be changed

The domain `jiteshmehta.in` is registered at GoDaddy and its DNS stays at GoDaddy. The email `jitesh@jiteshmehta.in` runs on Zoho Mail.

The website uses only two kinds of DNS record: the `A` records for the bare domain (`@`) and the `CNAME` record for `www`.

Never touch or delete: the three `MX` records, the SPF and DKIM `TXT` records, the `zoho-verification` `TXT` record, the `_dmarc` `TXT` record, the `NS` records, the `SOA` record and the `_domainconnect` `CNAME`. Never change nameservers. Never put a `CNAME` on the bare domain (`@`), because that would disable email.
