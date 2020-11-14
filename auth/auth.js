const DEPLOY_API_URL = process.env.DEPLOY_API_URL;
module.exports = {

    'facebookAuth': {
        'clientID': '407241193789061', // App ID của bản
        'clientSecret': '60585e68f087997e59e7cbafc18501bb', // App Secret của bạn
        'callbackURL': `${DEPLOY_API_URL}/auth/facebook/callback`
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': `${DEPLOY_API_URL}/auth/twitter/callback`
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': `${DEPLOY_API_URL}/authauth/google/callback`
    }

};