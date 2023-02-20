var a = function(css,script){
    return`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>외출</title>
        ${css}
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
    </head>
    <body class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">회원가입</h3></div>
                                    <div class="card-body">
                                        <form action="/register_process" method="post">
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputId" name="id" type="text" required>
                                                <label for="inputId">학번</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputpassword" name="password" type="password" required>
                                                <label for="inputpassword">비밀번호</label>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <select class="form-select" name="sex" aria-label="Default select example">
                                                    <option selected value="NULL">성별을 골라주세요</option>
                                                    <option value="man">남자</option>
                                                    <option value="woman">여자</option>
                                                </select>
                                                <br>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputage" name="age" type="text" required>
                                                <label for="inputage">나이</label>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <select class="form-select" name="selectcontact" aria-label="Default select example">
                                                    <option selected value="NULL">연락 받으실 경로를 선택해주세요</option>
                                                    <option>카카오톡</option>
                                                    <option>인스타</option>
                                                    <option>전화번호</option>
                                                </select>
                                                <input class="form-control" id="inputtherest" name="contact" type="text" required>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <div class="d-grid"><button class="btn btn-primary btn-block" type="submit">다음 장으로</button></div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="/login">로그인하러가기</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script>
            function search(){
                let searchcampus = document.getElementById('searchcampus')
                let card = document.getElementById('card');
                if(searchcampus.style.display == 'block' && card.style.display){
                    searchcampus.style.display = 'none';
                    card.style.display = 'none';
                }
                else{
                    searchcampus.style.display = 'block';
                    card.style.display = 'block';
                }
            }
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        ${script}
    </body>
</html>
`
}

// `
// <div class="form-floating mb-3">
//     <button type="button" onclick="search()">학교찾기 및 학생증 올리기</button>
// </div>
// <div class="form-floating mb-3" style="display: none" id="searchcampus">
//     ${campusall}
// </div>
// <div class="form-floating mb-3" style="display: none" id="card">
//     <div class="input-group mb-3">
//         <input type="file" class="form-control" id="inputGroupFile02">
//     </div>
// </div>`
module.exports =a;