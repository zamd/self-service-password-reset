import passwordChange from './passwordChange'
import * as constants from '../constants';

test('should handle default state', ()=>{
    const expected = {
        inProgress: false,
        error: {},
        infoMessage: ""
    }
    
    const actual = passwordChange(undefined, {}).toJS()
    expect(expected).toEqual(actual);
})

test('should clear alert messages', ()=>{

    const state = {
        inProgress: false,
        error: {description: "failed with status 5000"},
        infoMessage: "Password changed complete"
    }

    const expected = {
        inProgress: false,
        error: {},
        infoMessage: ""
    }

    const received = passwordChange(state, {
        type: constants.CLEAR_PASSWORD_CHANGE_ALERT
    }).toJS()
    expect(received ).toEqual(expected);
})

test('should set error description', ()=>{

    const expected = {
        inProgress: false,
        error: {description: "failed with status 500"},
        infoMessage: ""
    }

    const received = passwordChange(undefined, {
        type: constants.LOG_PASSWORD_CHANGE_ERROR,
        error: {description: "failed with status 500"}
    }).toJS()
    expect(received ).toEqual(expected);
})


test('should set success message when change password completed', ()=>{

    const expected = {
        inProgress: false,
        error: {},
        infoMessage: "Password changed succesfully"
    }

    const received = passwordChange(undefined, {
        type: constants.PASSWORD_CHANGE_COMPLETED,
        message: "Password changed succesfully"
    }).toJS()
    expect(received ).toEqual(expected);
})


test('should change to InProgress when change password is requested ', ()=>{

    const expected = {
        inProgress: true,
        error: {},
        infoMessage: ""
    }

    const received = passwordChange(undefined, {
        type: constants.PASSWORD_CHANGE_REQUESTED
    }).toJS()
    expect(received ).toEqual(expected);
})