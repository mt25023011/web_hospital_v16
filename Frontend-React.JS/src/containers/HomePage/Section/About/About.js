import React, { Component } from 'react';
import { connect } from "react-redux";
import './About.scss';

class About extends Component {

    render() {

        return (
            <div className='About-container'>
                <div className='About-header'>
                    <div className='About-header-title'>
                        <span>Về chúng tôi Video</span>
                    </div>
                </div>
                <div className='About-content'>
                    <div className='About-content-left'>
                        <div className='About-content-left-title'>
                            <span>Giới thiệu</span>
                        </div>
                        <div className='About-content-left-content'>
                            <iframe width="1191" height="670" src="https://www.youtube.com/embed/p3GcnGeqWec" title="🔴Tín Điều Sát Thủ Bóng (Tập 1)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className='About-content-right'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptate quas voluptatem quos perferendis
                            laudantium totam. Minus blanditiis porro asperiores, voluptatum aspernatur iure nam. Unde iusto alias cum
                            deleniti numquam quos aliquam rerum a aut ab at corporis eius, libero odio sunt exercitationem consectetur est
                            distinctio. Nostrum pariatur soluta quibusdam enim doloribus saepe fuga ipsum corrupti, molestiae aut ab
                            eligendi. Voluptate deleniti tempora facilis architecto, ullam odit molestiae! Ipsum debitis reiciendis saepe
                            veritatis praesentium temporibus illo minus, ex minima vel ea, inventore adipisci ad ducimus officiis possimus
                            asperiores quis placeat, eaque quasi. Incidunt voluptatibus voluptate iste minus dolore iusto similique
                            perspiciatis optio illo necessitatibus. Debitis rerum voluptas dolore magnam, saepe ea velit quaerat</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
