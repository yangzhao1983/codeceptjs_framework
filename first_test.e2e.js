
Feature('First test.e2e.js');

Scenario('test something', async (I) => {

    // test method for normal rest api
    let options = {
        tokenType: 'admin'
    };
    await I.haveAuthorizationHeader(options);

    // test method for api data factory
    const user = await I.have('user');
    const userId = user.id;
    I.say('I create user with user id ' + userId);

    // test method for UI
    I.amOnPage('http://www.baidu.com');
});
