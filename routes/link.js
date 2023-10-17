import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {

  const html = `
    <meta property="og:site_name" content="BueBue">
    <meta property="og:title" content="Advent Calendar" />
    <meta property="og:description" content="Advent Calendar" />
    <meta property="og:image" itemprop="image" content="https://cdn.buecherbuechse.de/wp-content/uploads/2022/11/Merch_gesamt.jpeg">
    <h1>Please Wait...</h1>
    <script>
        function openStore() {
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                window.location = "https://apps.apple.com/in/app/vitian/id1491471781";
            } else if (navigator.userAgent.match(/Android/)) {
                window.location = "https://play.google.com/store/apps/details?id=edu.vit.vtop.androidapp&pli=1";
            }
        }
        console.log("window.location.search", window.location.search);
        console.log(
            "window.location.search.replace('?redirect/', '')",
            window.location.search.replace("?redirect/", "")
        );
        window.location.replace(
            \`techDaily://${window.location.search.replace("?redirect/", "")}\`
        );
        setTimeout(function () {
            openStore();
        }, 1000);
    </script>
  `;

  res.send(html);
});

export default router;
