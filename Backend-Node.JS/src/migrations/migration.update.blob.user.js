module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state
        return queryInterface.changeColumn(
            'Users',
            'image',
            {
                type: Sequelize.BLOB('long'),
                allowNull: true
            }
        );

    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
        return queryInterface.changeColumn(
            'Users',
            'image',
            {
                type: Sequelize.BLOB('long'),
                allowNull: true
            }
        );
    }
}