import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty/Specialty';
import MedicalFacility from './Section/MedicalFacility/MedicalFacility';
import FeaturedDoctor from './Section/FeaturedDoctor/FeaturedDoctor';
import HandBook from './Section/HandBook/HandBook';
import About from './Section/About/About';
import HomeFooter from './HomeFooter';
import HeaderBanner from './Section/HeaderBanner';
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <HeaderBanner />
                <div style={{ height: "10px" }}></div>
                <Specialty />
                <div style={{ height: "10px" }}></div>
                <MedicalFacility />
                <div style={{ height: "10px" }}></div>
                <FeaturedDoctor />
                <div style={{ height: "10px" }}></div>
                <HandBook />
                <div style={{ height: "10px" }}></div>
                <About />
                <div style={{ height: "10px" }}></div>
                <HomeFooter />
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