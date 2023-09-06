
import empty_BN from '/src/assets/empty1.png'
import todo_BN from '/src/assets/rhefZ3.png'

function NotFound() {
    return (
        <>
            <div id="todoListPage" className="bg-yellow">
                <div className="conatiner todoListPage vhContainer">
                    <div className="emptyList">
                        <h4 className="emptytext">404 Not Found</h4>
                        <img
                            className="emptypic"
                            src={empty_BN}
                            alt="404 Not Found"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound