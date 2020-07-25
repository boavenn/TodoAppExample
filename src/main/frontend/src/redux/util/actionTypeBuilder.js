class ActionTypeBuilder {
    constructor() {
        this.actionTypes = {};
    }

    addType(actionType) {
        this.actionTypes[actionType] = actionType;
        return this;
    }

    addHttpType(actionType) {
        this.actionTypes[actionType] = actionType;
        this.actionTypes[`${actionType}_REQUEST`] = `${actionType}_REQUEST`;
        this.actionTypes[`${actionType}_SUCCESS`] = `${actionType}_SUCCESS`;
        this.actionTypes[`${actionType}_FAILURE`] = `${actionType}_FAILURE`;
        return this;
    }

    build() {
        const temp = this.actionTypes;
        this.actionTypes = {};
        return temp;
    }
}

const actionTypeBuilder = new ActionTypeBuilder();

export default actionTypeBuilder;