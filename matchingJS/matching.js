exports.home = function(campus,matching,sex){
    return `
    <div id="layoutSidenav_content">
        <main>
            <form action="matching_process" method="post">
                <div>
                    자기 학교 : ${campus}
                </div> 
                <div>
                    <select class="form-select" name="selectmatch" aria-label="Default select example">
                        <option selected> 매칭 종류 정하기 </option>
                        <option value="friend">친구</option>
                        <option value="lover">연인</option>
                    </select>
                </div>
                <div>
                    <select class="form-select" name="selectsex" aria-label="Default select example">
                        <option selected> 상대방 성별 정하기 </option>
                        <option value="man">남자</option>
                        <option value="woman">여자</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    제출하기
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                제출하시겠습니까?
                            </div>
                            <div class="modal-footer">
                                <input type="submit" class="btn btn-secondary" data-bs-dismiss="modal" name ="close" value="close">
                                <input type="submit" class="btn btn-primary" name="ok" value="ok">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    `
} 
{/* <div class="modal modal-alert position-static d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalChoice">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
            <div class="modal-body p-4 text-center">
                <h5 class="mb-0">Enable this setting?</h5>
                <p class="mb-0">You can always change your mind in your account settings.</p>
            </div>
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"><strong>Yes, enable</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">No thanks</button>
            </div>
        </div>
    </div>
</div> */}
