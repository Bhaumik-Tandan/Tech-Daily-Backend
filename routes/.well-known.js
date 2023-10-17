import { Router } from 'express';

const router = Router();

router.route('/assetlinks.json').get(async (req, res) => {
   const json= [{
        "relation": [
        "delegate_permission/common.handle_all_urls"
        ],
        "target": {
        "namespace": "android_app",
        "package_name": "com.jsdaily.jsdaily",
        "sha256_cert_fingerprints": [
        "40:06:E5:2E:47:01:BD:E7:D1:4D:D6:22:CE:8F:0A:F1:33:A0:2A:72:F0:59:52:D7:80:C6:1A:EA:E1:5E:3F:AF"
        ]
        }
    }];
    res.json(json);
});



export default router;
