import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container" >
                <div className="title-user-redux">
                    <FormattedMessage id="menu.system.system-administrator.user-redux" />
                </div>
                <div className="body-user-redux">
                    <div>tạm thời không có dữ liệu</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
