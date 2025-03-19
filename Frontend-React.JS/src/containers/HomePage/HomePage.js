import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty/Specialty';
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <Specialty />
                <div style={{ height: "1000px" }}></div>
            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);