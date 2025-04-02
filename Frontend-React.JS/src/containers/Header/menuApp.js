export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.system.user-manage.header',
        menus:
            [
                { name: 'menu.system.user-manage.crud', link: '/system/user-manage' },
                { name: 'menu.system.user-manage.crud-redux', link: '/system/user-redux' },
                { name: 'menu.system.user-manage.doctor-manage', link: '/system/DoctorManager/Doctor' },    
                { name: 'menu.system.user-manage.patient-manage', link: '/system/patient-manage' },
                { name: 'menu.system.doctor.schedule-manage', link: '/doctor/schedule-manage' },
            ],
    },
    { //quản lý Phòng khám
        name: 'menu.system.hospital-manage.header',
        menus:
            [
                { name: 'menu.system.hospital-manage.clinic-manage', link: '/system/hospital-manage/clinic' },
            ],
    },
    { //quản lý chuyên khoa
        name: 'menu.system.Specialty.header',
        menus:
            [
                { name: 'menu.system.Specialty.specialty-manage', link: '/system/specialty/specialty' },
            ],
    },
    { //quản lý cơ sở y tế
        name: 'menu.system.Medical-facility.header',
        menus:
            [
                { name: 'menu.system.Medical-facility.facility-manage', link: '/system/medical-facility/facility' },
            ],
    },
    { //quản lý sách hướng dẫn
        name: 'menu.system.Handbook.header',
        menus:
            [
                { name: 'menu.system.Handbook.handbook-manage', link: '/system/handbook/handbook' },
            ],
    },
];

export const doctorMenu = [
    { //quản lý người dùng
        name: 'menu.system.doctor.header',
        menus:
            [
                { name: 'menu.system.doctor.schedule-manage', link: '/doctor/schedule-manage' },
            ],
    },
];