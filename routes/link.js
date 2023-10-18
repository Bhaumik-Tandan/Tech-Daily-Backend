import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const query = req.query;
  const html = `
  <meta property="og:site_name" content="Tech Daily">
<meta property="og:title" content="One Stop Solution For All Tech News" />
<meta property="og:description" content="Download the App from the play store" />
<meta property="og:image" itemprop="image" content="https://assets.thehansindia.com/h-upload/2021/05/25/1078280-tech.webp">
    <h1>Please Wait...</h1>
    <script>
        function openStore() {
            if (navigator.userAgent.match(/(iPod|iPhone|iPad|Mac)/)) {
                window.location = "https://play.google.com/store/apps/details?id=com.jsdaily.jsdaily&pli=1";
            } else {
                window.location = "https://play.google.com/store/apps/details?id=com.jsdaily.jsdaily&pli=1";
            }
        }
        
        window.location.replace(
            \`tech-daily://${query.redirect}\`
        );
        setTimeout(function () {
            openStore();
        }, 1000);
    </script>
  `;

  res.send(html);
});

export default router;
