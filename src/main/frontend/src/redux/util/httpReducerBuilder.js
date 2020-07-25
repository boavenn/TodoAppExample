class HttpReducerBuilder {
    constructor() {
        this.subreducers = new Map();
    }

    addSubreducer(actionTypePrefix, subreducer) {
        this.subreducers.set(actionTypePrefix + '_REQUEST', subreducer);
        this.subreducers.set(actionTypePrefix + '_SUCCESS', subreducer);
        this.subreducers.set(actionTypePrefix + '_FAILURE', subreducer);
        return this;
    }

    build(initialState) {
        return (state = initialState, action) => {
            if (this.subreducers.has(action.type)) {
                const subreducer = this.subreducers.get(action.type);
                return subreducer(state, action);
            }
            return state;
        }
    }
}

const httpReducerBuilder = new HttpReducerBuilder();

export default httpReducerBuilder;