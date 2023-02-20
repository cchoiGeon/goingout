var a = function(people){
    return `
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <section class="page-section" id="services">
                <div class="container">
                    <div class="text-center">
                        <img src="/img/HUFS.png">
                        <br>
                        <br>
                        <br>
                        <h2 class="section-subheading text-muted">현재 외출 사용 현황</h3>
                        <br>
                        <br>
                        <br>
                    </div>
                    <div class="row text-center">
                        <div class="col-md-4">
                            <span class="fa-stack fa-4x">                                          
                                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                                <!-- 아이콘 변경 필요-->                                     
                            </span>
                            <h4 class="my-3">연인 매칭</h4>
                            <p class="text-muted">현재 참여중인 인원 : ${people} </p>
                        </div>
                        <div class="col-md-4">
                            <span class="fa-stack fa-4x">                                            
                                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                                <!-- 아이콘 변경 필요-->
                            </span>
                            <h4 class="my-3">친구 매칭</h4>
                            <p class="text-muted">현재 참여중인 인원</p>
                        </div>
                        <div class="col-md-4">
                            <span class="fa-stack fa-4x">
                                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
                                <!-- 아이콘 변경 필요-->
                            </span>
                            <h4 class="my-3">그룹 매칭</h4>
                            <p class="text-muted">현재 참여중인 인원</p>
                        </div>
                        <!-- 현재 참여중인 인원 ??? -> 데이터 수 불러와서 표시, js-->
                    </div>
                </div>
            </section>
        </div>
    </main>`
}
module.exports = a;
