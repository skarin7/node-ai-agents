function log(message) {
    console.log(`[LOG] ${message}`);
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

export default {
    log,
    generateId
};