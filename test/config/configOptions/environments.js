var env = {
    ad: {
        params: {
            name: 'ad',
            defaultUserName: 'imageright\\xp1',
            defaultFullName: 'XP1',
            defaultPassword: 'T3amW0rk',
            defaultUrl: 'https://con-webctest2.vertafore.com/ImageRight.Web.Client/',
            defaultDBUser: 'sa',
            defaultDBPassword: 'Password1',
            defaultDBServer: 'con-webctest4.imageright.com',
            defaultDatabase: 'irwebclientauto',
            authentication: 'ad',
            siteBase: 'iis',
            isMobile: false
        }
    },
    work: {
        params: {
            name: 'work',
            defaultUserName: 'imageright\\xp1',
            defaultFullName: 'XP1',
            defaultPassword: 'T3amW0rk',
            defaultUrl: 'https://con-webctest2.vertafore.com/imageRight.web.client.work/',
            defaultDBUser: 'sa',
            defaultDBPassword: 'Password1',
            defaultDBServer: 'con-webctest4.imageright.com',
            defaultDatabase: 'irwebclientauto_newly',
            authentication: 'ad',
            siteBase: 'iis',
            isMobile: false
        }
    },
    local: {
        params: {
            name: 'local',
            defaultUserName: 'minsk\\Ivan_Katovich',
            defaultFullName: 'Ivan_Katovich',
            defaultPassword: '0801AlexHalfYear1983',
            defaultUrl: 'https://epbyminw4373.minsk.epam.com/imageright.web.client/',
            defaultDBUser: 'Ivan_Katovich',
            defaultDBPassword: '',
            defaultDBServer: 'LOCALHOST',
            defaultDatabase: 'IRLoc',
            authentication: 'ad',
            siteBase: 'iis',
            isMobile: false
        }
    },
    mock: {
        params: {
            name: 'mock',
            // defaultUserName: 'imageright\\xp1',
            // defaultFullName: 'XP1',
            // defaultPassword: 'T3amW0rk',
            defaultUrl: 'http://localhost:3000/',
            // defaultDBUser: 'sa',
            // defaultDBPassword: 'Password1',
            // defaultDBServer: 'con-webctest4.imageright.com',
            // defaultDatabase: 'irwebclientauto',
            authentication: 'ad',
            siteBase: 'mock',
            isMobile: false
        }
    }
};

module.exports = env;