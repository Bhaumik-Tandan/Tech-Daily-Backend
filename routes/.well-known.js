import { Router } from 'express';

const router = Router();

router.route('/assetlinks.json').get(async (req, res) => {
   const json= [
    {
      "relation": [
        "delegate_permission/common.handle_all_urls"
      ],
      "target": {
        "namespace": "android_app",
        "package_name": "com.jsdaily.jsdaily",
        "sha256_cert_fingerprints": [
          "40:06:E5:2E:47:01:BD:E7:D1:4D:D6:22:CE:8F:0A:F1:33:A0:2A:72:F0:59:52:D7:80:C6:1A:EA:E1:5E:3F:AF",
          "25:27:2E:FB:6D:E1:DC:A3:29:4F:E9:F9:0A:5C:BE:82:98:4D:39:38:35:01:11:F0:7A:9D:3C:98:F1:C1:65:C3"
        ]
      }
    }
  ];
    res.json(json);
});



export default router;
