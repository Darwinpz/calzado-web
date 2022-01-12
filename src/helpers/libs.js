const helpers = {};


helpers.select = (selected, option)=>{

    return (selected == option) ? 'selected="selected"' : ''

}


module.exports = helpers;