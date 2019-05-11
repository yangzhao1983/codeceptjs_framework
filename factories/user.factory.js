let Factory = require('rosie').Factory;
let Constants = require('../util/constants');

module.exports = new Factory().option('idSuffix', () => new Date().toISOString().replace(/[-:.]/g, '') + '-' + parseInt(Math.random() * 1000))
    .attr('name', ['idSuffix'], (idSuffix) => (
        {
            'givenName': 'user' + idSuffix,
            'familyName': 'Surname',
            'middleName': 'M',
            'honorificPrefix': 'Mr',
            'honorificSuffix': 'Jr'
        }
    ))
    .attr('displayName', ['name'], (name) => name.givenName + ' ' + name.familyName)
    .attr('userName', ['name'], (name) => name.givenName + '@myservice.invalid')
    .attr('emails', ['userName'], (userName) => [{
        primary: true,
        type: 'work',
        value: userName
    }])
    .attr({
        'password': 'Welcome1',
        'active': true,
        'preferredLanguage': 'en',
        'timezone': 'America/Los_Angeles',
        'title': 'Software Developer',
        'locale': 'en',
        'ims': [{
            'type': 'work',
            'postalCode': '11111',
            'country': 'CN',
            'locality': 'BJ',
            'region': 'BJ',
            'streetAddress': 'Haidian'
        }],
        'phoneNumbers': [
            {
                'value': '1234567890',
                'verified': false,
                'type': 'home',
                'primary': false,
                'display': 1234567890
            },
            {
                'value': '2234567890',
                'verified': false,
                'type': 'mobile',
                'primary': false,
                'display': 2234567890
            },
            {
                'value': '3234567890',
                'verified': false,
                'type': 'work',
                'primary': false,
                'display': 3234567890
            }
        ]
    })
    .attr(Constants.Schema.USER_EXTENSION,{
        'isFederatedUser': false
    }).attr(Constants.Schema.USER_STATE,{
        'locked' :{
            'on' : false
        }
    }).attr('schemas', ()=>[
        Constants.Schema.USER_CORE,
        Constants.Schema.USER_EXTENSION,
        Constants.Schema.USER_STATE
    ]);