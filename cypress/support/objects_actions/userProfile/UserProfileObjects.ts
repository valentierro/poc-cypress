class UserProfileObjects {

    constructor() {
    }

    btnDeleteBook = () => '[id*="delete-record"]'
    btnOkModal = () => '#closeSmallModal-ok'
    btnCancelModal = () => '#closeSmallModal-cancel'
    imgBooks = () => '.rt-table img[src*="book"]'
    selectRowsPerPage = () => 'select[aria-label*="rows"]'
}
export default UserProfileObjects