import React, { Component } from 'react';
import { Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import { fetchDoctorList } from '../../../store/actions/userActions';
import { addDoctorInfoStart } from '../../../store/actions/adminActions';

// Khởi tạo markdown parser
const mdParser = new MarkdownIt();

// **DoctorSelect Component**
const DoctorSelect = ({ selectedDoctor, handleSelectDoctor, filteredDoctors, handleInputChange }) => (
    <div className="doctor-select-wrapper h-100">
        <Form.Group controlId="doctorName" className="h-100">
            <Form.Label className="fw-bold mb-3">Tên bác sĩ</Form.Label>
            <Select
                className='doctor-select'
                value={selectedDoctor}
                onChange={handleSelectDoctor}
                onInputChange={handleInputChange}
                options={filteredDoctors}
                placeholder="Chọn bác sĩ"
                isClearable
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: '45px',
                        borderRadius: '8px',
                        borderColor: '#ced4da',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: '#80bdff'
                        }
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#6c757d'
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999
                    })
                }}
            />
        </Form.Group>
    </div>
);

// **DoctorIntroduction Component**
const DoctorIntroduction = ({ description, setDescription }) => (
    <div className="doctor-intro-wrapper h-100">
        <Form.Group controlId="doctorIntroduction" className="h-100">
            <Form.Label className="fw-bold mb-3">Thông tin giới thiệu</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Nhập thông tin giới thiệu" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-100"
                style={{
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    minHeight: '45px',
                    resize: 'none',
                    boxShadow: 'none',
                    border: '1px solid #ced4da',
                    '&:focus': {
                        borderColor: '#80bdff',
                        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
                    }
                }}
            />
        </Form.Group>
    </div>
);

// **MarkdownEditor Component**
const MarkdownEditorComponent = ({ handleEditorChange }) => (
    <div className="markdown-editor-wrapper">
        <h4 className="fw-bold mb-3">Thông tin chi tiết</h4>
        <MdEditor
            style={{ 
                height: '500px',
                borderRadius: '8px',
                overflow: 'hidden'
            }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            placeholder="Nhập thông tin chi tiết về bác sĩ..."
        />
    </div>
);

// **Main Doctor Component**
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            selectedDoctor: null,
            introduction: '',
            introductionHTML: '',
            description: '',
            isLoading: false,
            error: null,
            doctors: [],
            filteredDoctors: []
        };
    }

    componentDidMount() {
        this.props.fetchDoctorList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.doctorList !== this.props.doctorList) {
            const doctors = this.props.doctorList?.map(doctor => ({
                label: doctor.lastName + ' ' + doctor.firstName,
                value: doctor.id
            })) || [];
            
            this.setState({ 
                doctors,
                filteredDoctors: this.filterDoctors(doctors, this.state.inputValue)
            });
        }
    }

    filterDoctors = (doctors, inputValue) => {
        return doctors.filter(doctor =>
            (doctor.label || '').toLowerCase().includes((inputValue || '').toLowerCase())
        );
    }

    handleInputChange = (newValue) => {
        this.setState(prevState => ({
            inputValue: newValue || '',
            filteredDoctors: this.filterDoctors(prevState.doctors, newValue || '')
        }));
    }

    handleSelectDoctor = (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption,
            inputValue: selectedOption ? selectedOption.label : ''
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            introduction: text,
            introductionHTML: html
        });
    }

    setDescription = (value) => {
        this.setState({ description: value });
    }

    handleSaveDoctorInfo = async () => {
        try {
            this.setState({ isLoading: true, error: null });
            
            const { selectedDoctor, description, introduction, introductionHTML } = this.state;

            if (!selectedDoctor?.value) {
                throw new Error('Please select a doctor');
            }
            if (!description.trim()) {
                throw new Error('Please enter doctor description');
            }
            if (!introduction.trim()) {
                throw new Error('Please enter doctor introduction');
            }

            const doctorInfo = {
                doctorId: selectedDoctor.value,
                introduction,
                introductionHTML,
                description
            };

            const response = await this.props.addDoctorInfo(doctorInfo);
            console.log('response', response);

            if (response && response.status === 200) {
                alert('Save doctor information successfully!');
            } else {
                alert(response?.message || 'Error saving doctor information');
            }

        } catch (err) {
            this.setState({ error: err.message });
            alert(err.message);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { selectedDoctor, description, filteredDoctors, isLoading } = this.state;

        return (
            <Container fluid className="doctor-container py-4">
                <Card className="shadow-sm">
                    <Card.Header className="bg-white border-0 pt-4">
                        <h2 className="text-center text-primary mb-4">Quản lý thông tin bác sĩ</h2>
                    </Card.Header>
                    <Card.Body className="px-4 pb-4">
                        <div className="doctor-form-section mb-4">
                            <Row className="g-4 align-items-stretch">
                                <Col md={6} className="border-end">
                                    <DoctorSelect 
                                        selectedDoctor={selectedDoctor}
                                        handleSelectDoctor={this.handleSelectDoctor}
                                        filteredDoctors={filteredDoctors}
                                        handleInputChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <DoctorIntroduction 
                                        description={description}
                                        setDescription={this.setDescription}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="markdown-section">
                            <MarkdownEditorComponent 
                                handleEditorChange={this.handleEditorChange}
                            />
                        </div>
                        <div className="action-section text-end mt-4">
                            <Button 
                                variant="primary" 
                                size="lg"
                                onClick={this.handleSaveDoctorInfo}
                                disabled={isLoading}
                                className="px-5 py-2"
                                style={{
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    minWidth: '200px'
                                }}
                            >
                                {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    doctorList: state.user.doctorList,
    addDoctorInfo: state.admin.addDoctorInfo
});

const mapDispatchToProps = (dispatch) => ({
    fetchDoctorList: () => dispatch(fetchDoctorList()),
    addDoctorInfo: (doctorInfo) => dispatch(addDoctorInfoStart(doctorInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
