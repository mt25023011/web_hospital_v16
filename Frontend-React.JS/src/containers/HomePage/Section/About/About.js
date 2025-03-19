import React, { Component } from 'react';
import { connect } from "react-redux";
import './About.scss';

class About extends Component {

    render() {

        return (
            <div class="About-container">
                <div class="About-content-left">
                    <div class="About-content-left-title">Giới thiệu về chúng tôi</div>
                    <div class="About-content-left-content">
                        <iframe width="1191" height="670" src="https://www.youtube.com/embed/p3GcnGeqWec" title="🔴Tín Điều Sát Thủ Bóng (Tập 1)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="About-content-right">
                    <p>Chúng tôi là một công ty công nghệ hàng đầu, chuyên cung cấp các giải pháp sáng tạo để nâng cao trải nghiệm người dùng...</p>
                    <p>Sứ mệnh của chúng tôi là giúp mọi người kết nối dễ dàng hơn trong thế giới số hóa ngày nay...</p>
                    <p>Hãy theo dõi chúng tôi để cập nhật thêm thông tin mới nhất!</p>
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
