import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const query = req.query;
  const html = `
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
