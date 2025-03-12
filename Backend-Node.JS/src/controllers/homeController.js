import express from 'express';


let homePage = (req, res) => {
    res.send('Hello World');
}

export default {
    homePage: homePage
};
