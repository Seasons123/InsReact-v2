import React from 'react';
import {render} from 'react-dom';

import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var SyncStore = require('../../../components/flux/stores/SyncStore');
var BuyPage = React.createClass({
    getInitialState: function() {
        return {
            session:SyncStore.getState(),
        }
    },
    render: function () {
        return(
            <div>
                ppp
            </div>
        )
    }
});
module.exports = BuyPage;
