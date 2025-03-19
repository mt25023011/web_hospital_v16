import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty/Specialty';
import MedicalFacility from './Section/MedicalFacility/MedicalFacility';
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <div style={{ height: "10px" }}></div>
                <Specialty />
                <div style={{ height: "10px" }}></div>
                <MedicalFacility />
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