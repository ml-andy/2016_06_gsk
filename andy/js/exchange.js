function getUrlVars(){for(var a,n=[],e=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),o=0;o<e.length;o++)a=e[o].split("="),n.push(a[0]),n[a[0]]=a[1];return n}$(document).ready(function(){function a(){o()}function n(a){a?$(".pop").fadeIn():$(".pop").fadeOut()}function e(){var a=window.location.href.split(".html?")[1];t(!0),$.ajax({url:s.backendurl+"api_exchange_confirm.ashx",type:"POST",dataType:"json",data:{qs:a},success:function(a){console.log(a),t(!1),"OK"==a.RS?(n(!1),setTimeout(function(){$(".pop").html(""),s.userdata.EXCHANGE=1,$(".btn").removeClass("nochange").addClass("haschange")},300)):alert(a.RS)},error:function(a,n,e){t(!1),console.log("error:",a,n,e)}})}function o(){var a=window.location.href.split(".html?")[1];$.ajax({url:s.backendurl+"api_exchange.ashx",type:"POST",dataType:"json",data:{qs:a},success:function(a){console.log(a),s.userdata=a,"OK"==a.RS?($(".city").html(s.userdata.CITY),$(".store").html(s.userdata.STORE),$(".content").addClass("on"),0!=s.userdata.EXCHANGE?$(".btn").removeClass("nochange").addClass("haschange"):($(".pop").append('<div class="main"><div class="w">確定要兌換了嗎?</div><div class="yesbtn"></div><div class="nobtn"></div></div><div class="cover"></div>'),$(".yesbtn").click(function(){$(this).hasClass("on")||e()}),$(".nobtn").click(function(){n(!1)}),$(".btn").removeClass("haschange").addClass("nochange"))):alert(a.RS),t(!1)},error:function(a,n,e){console.log("error:",a,n,e)}})}function t(a){a?$(".loading").fadeIn():$(".loading").fadeOut()}var s={};s.wrp=$(".wrapper"),s.backendurl="http://2016parodontax.everydayhealth.com.tw/xml/",device.mobile()?s.device="mobile":s.device="pc",$(".btn").click(function(){0==s.userdata.EXCHANGE&&n(!0)}),$(window).load(a)});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4Y2hhbmdlLmpzIl0sIm5hbWVzIjpbImdldFVybFZhcnMiLCJoYXNoIiwidmFycyIsImhhc2hlcyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNsaWNlIiwiaW5kZXhPZiIsInNwbGl0IiwiaSIsImxlbmd0aCIsInB1c2giLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIndpbmRvd0xvYWQiLCJ3aW5kb3dJbml0Iiwic2hvd3BvcCIsIl90IiwiZmFkZUluIiwiZmFkZU91dCIsInNlbmRkYXRhIiwiZ2V0Y29kZSIsInNob3dMb2FkaW5nIiwiYWpheCIsInVybCIsIndlYkRhdGEiLCJiYWNrZW5kdXJsIiwidHlwZSIsImRhdGFUeXBlIiwiZGF0YSIsInFzIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJSUyIsInNldFRpbWVvdXQiLCJodG1sIiwidXNlcmRhdGEiLCJFWENIQU5HRSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhbGVydCIsImVycm9yIiwieGhyIiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwiQ0lUWSIsIlNUT1JFIiwiYXBwZW5kIiwiY2xpY2siLCJ0aGlzIiwiaGFzQ2xhc3MiLCJ3cnAiLCJkZXZpY2UiLCJtb2JpbGUiLCJsb2FkIl0sIm1hcHBpbmdzIjoiQUF5RkEsUUFBU0EsY0FFTCxJQUFJLEdBRFFDLEdBQVJDLEtBQWlCQyxFQUFPQyxPQUFPQyxTQUFTQyxLQUFLQyxNQUFNSCxPQUFPQyxTQUFTQyxLQUFLRSxRQUFRLEtBQUssR0FBR0MsTUFBTSxLQUMxRkMsRUFBRSxFQUFFQSxFQUFFUCxFQUFPUSxPQUFPRCxJQUFLVCxFQUFLRSxFQUFPTyxHQUFHRCxNQUFNLEtBQUtQLEVBQUtVLEtBQUtYLEVBQUssSUFBSUMsRUFBS0QsRUFBSyxJQUFJQSxFQUFLLEVBQ2pHLE9BQU9DLEdBNUZYVyxFQUFFQyxVQUFVQyxNQUFNLFdBY2pCLFFBQVNDLEtBQ0ZDLElBTUosUUFBU0MsR0FBUUMsR0FDVkEsRUFBSU4sRUFBRSxRQUFRTyxTQUNaUCxFQUFFLFFBQVFRLFVBRW5CLFFBQVNDLEtBQ0wsR0FBSUMsR0FBVW5CLE9BQU9DLFNBQVNDLEtBQUtHLE1BQU0sVUFBVSxFQUNuRGUsSUFBWSxHQUNaWCxFQUFFWSxNQUNFQyxJQUFLQyxFQUFRQyxXQUFhLDRCQUMxQkMsS0FBTSxPQUNOQyxTQUFVLE9BQ1ZDLE1BQ0lDLEdBQUdULEdBRVBVLFFBQVMsU0FBU0YsR0FDZEcsUUFBUUMsSUFBSUosR0FDWlAsR0FBWSxHQUNBLE1BQVRPLEVBQUtLLElBQ0psQixHQUFRLEdBQ1JtQixXQUFXLFdBQ1B4QixFQUFFLFFBQVF5QixLQUFLLElBQ2ZYLEVBQVFZLFNBQVNDLFNBQVMsRUFDMUIzQixFQUFFLFFBQVE0QixZQUFZLFlBQVlDLFNBQVMsY0FDN0MsTUFDQUMsTUFBTVosRUFBS0ssS0FDbkJRLE1BQU8sU0FBU0MsRUFBS0MsRUFBWUMsR0FDL0J2QixHQUFZLEdBQ1pVLFFBQVFDLElBQUksU0FBVVUsRUFBS0MsRUFBWUMsTUFJbkQsUUFBUzlCLEtBQ0wsR0FBSU0sR0FBVW5CLE9BQU9DLFNBQVNDLEtBQUtHLE1BQU0sVUFBVSxFQUNuREksR0FBRVksTUFDRUMsSUFBS0MsRUFBUUMsV0FBYSxvQkFDMUJDLEtBQU0sT0FDTkMsU0FBVSxPQUNWQyxNQUNJQyxHQUFHVCxHQUVQVSxRQUFTLFNBQVNGLEdBQ2RHLFFBQVFDLElBQUlKLEdBQ1pKLEVBQVFZLFNBQVdSLEVBQ1AsTUFBVEEsRUFBS0ssSUFDSnZCLEVBQUUsU0FBU3lCLEtBQUtYLEVBQVFZLFNBQVNTLE1BQ2pDbkMsRUFBRSxVQUFVeUIsS0FBS1gsRUFBUVksU0FBU1UsT0FDbENwQyxFQUFFLFlBQVk2QixTQUFTLE1BQ08sR0FBM0JmLEVBQVFZLFNBQVNDLFNBQWEzQixFQUFFLFFBQVE0QixZQUFZLFlBQVlDLFNBQVMsY0FFeEU3QixFQUFFLFFBQVFxQyxPQUFPLHFJQUNqQnJDLEVBQUUsV0FBV3NDLE1BQU0sV0FDWHRDLEVBQUV1QyxNQUFNQyxTQUFTLE9BQU8vQixNQUVoQ1QsRUFBRSxVQUFVc0MsTUFBTSxXQUFXakMsR0FBUSxLQUNyQ0wsRUFBRSxRQUFRNEIsWUFBWSxhQUFhQyxTQUFTLGNBRTlDQyxNQUFNWixFQUFLSyxJQUNqQlosR0FBWSxJQUNkb0IsTUFBTyxTQUFTQyxFQUFLQyxFQUFZQyxHQUMvQmIsUUFBUUMsSUFBSSxTQUFVVSxFQUFLQyxFQUFZQyxNQUlwRCxRQUFTdkIsR0FBWUwsR0FDakJBLEVBQUlOLEVBQUUsWUFBWU8sU0FDaEJQLEVBQUUsWUFBWVEsVUFyRnRCLEdBQUlNLEtBR0pBLEdBQVEyQixJQUFJekMsRUFBRSxZQUNYYyxFQUFRQyxXQUFhLG1EQUNsQjJCLE9BQU9DLFNBQVU3QixFQUFRNEIsT0FBTyxTQUM5QjVCLEVBQVE0QixPQUFPLEtBR3BCMUMsRUFBRSxRQUFRc0MsTUFBTSxXQUNrQixHQUEzQnhCLEVBQVFZLFNBQVNDLFVBQWF0QixHQUFRLEtBRWhETCxFQUFFVCxRQUFRcUQsS0FBS3pDIiwiZmlsZSI6ImV4Y2hhbmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHR2YXIgd2ViRGF0YSA9e307XHRcclxuXHJcblx0Ly9Jbml0XHJcblx0d2ViRGF0YS53cnA9JCgnLndyYXBwZXInKTsgICAgXHJcbiAgICB3ZWJEYXRhLmJhY2tlbmR1cmwgPSAnaHR0cDovLzIwMTZwYXJvZG9udGF4LmV2ZXJ5ZGF5aGVhbHRoLmNvbS50dy94bWwvJztcclxuICAgIGlmKGRldmljZS5tb2JpbGUoKSkgd2ViRGF0YS5kZXZpY2U9XCJtb2JpbGVcIjtcclxuICAgIGVsc2Ugd2ViRGF0YS5kZXZpY2U9XCJwY1wiO1xyXG4gICAgXHJcbiAgICAvL0FkZGxpc3RlbmVyXHJcbiAgICAkKCcuYnRuJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih3ZWJEYXRhLnVzZXJkYXRhLkVYQ0hBTkdFPT0wKSBzaG93cG9wKHRydWUpO1xyXG4gICAgfSlcclxuXHQkKHdpbmRvdykubG9hZCh3aW5kb3dMb2FkKTtcclxuXHRmdW5jdGlvbiB3aW5kb3dMb2FkKCl7XHJcbiAgICAgICAgd2luZG93SW5pdCgpO1xyXG5cdH1cclxuICAgIFxyXG5cclxuXHJcbiAgICAvL0VldmVudCAgICBcclxuICAgIGZ1bmN0aW9uIHNob3dwb3AoX3Qpe1xyXG4gICAgICAgIGlmKF90KSAkKCcucG9wJykuZmFkZUluKCk7XHJcbiAgICAgICAgZWxzZSAkKCcucG9wJykuZmFkZU91dCgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2VuZGRhdGEoKXtcclxuICAgICAgICB2YXIgZ2V0Y29kZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcuaHRtbD8nKVsxXTtcclxuICAgICAgICBzaG93TG9hZGluZyh0cnVlKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHdlYkRhdGEuYmFja2VuZHVybCArICdhcGlfZXhjaGFuZ2VfY29uZmlybS5hc2h4JyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIHFzOmdldGNvZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLlJTPT1cIk9LXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dwb3AoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcCcpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJEYXRhLnVzZXJkYXRhLkVYQ0hBTkdFPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5idG4nKS5yZW1vdmVDbGFzcygnbm9jaGFuZ2UnKS5hZGRDbGFzcygnaGFzY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwzMDApOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBhbGVydChkYXRhLlJTKTtcclxuICAgICAgICAgICAgfSxlcnJvcjogZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjpcIiwgeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gd2luZG93SW5pdCgpe1xyXG4gICAgICAgIHZhciBnZXRjb2RlID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy5odG1sPycpWzFdO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogd2ViRGF0YS5iYWNrZW5kdXJsICsgJ2FwaV9leGNoYW5nZS5hc2h4JyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIHFzOmdldGNvZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB3ZWJEYXRhLnVzZXJkYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuUlM9PVwiT0tcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNpdHknKS5odG1sKHdlYkRhdGEudXNlcmRhdGEuQ0lUWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnN0b3JlJykuaHRtbCh3ZWJEYXRhLnVzZXJkYXRhLlNUT1JFKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVudCcpLmFkZENsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlYkRhdGEudXNlcmRhdGEuRVhDSEFOR0UhPTApICQoJy5idG4nKS5yZW1vdmVDbGFzcygnbm9jaGFuZ2UnKS5hZGRDbGFzcygnaGFzY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcCcpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1haW5cIj48ZGl2IGNsYXNzPVwid1wiPueiuuWumuimgeWFjOaPm+S6huWXjj88L2Rpdj48ZGl2IGNsYXNzPVwieWVzYnRuXCI+PC9kaXY+PGRpdiBjbGFzcz1cIm5vYnRuXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvdmVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy55ZXNidG4nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoISQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHNlbmRkYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubm9idG4nKS5jbGljayhmdW5jdGlvbigpe3Nob3dwb3AoZmFsc2UpO30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRuJykucmVtb3ZlQ2xhc3MoJ2hhc2NoYW5nZScpLmFkZENsYXNzKCdub2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGFsZXJ0KGRhdGEuUlMpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LGVycm9yOiBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjpcIiwgeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgfSAgIFxyXG4gIFx0ZnVuY3Rpb24gc2hvd0xvYWRpbmcoX3Qpe1xyXG4gIFx0XHRpZihfdCkgJCgnLmxvYWRpbmcnKS5mYWRlSW4oKTtcclxuICBcdFx0ZWxzZSAkKCcubG9hZGluZycpLmZhZGVPdXQoKTtcclxuICBcdH1cclxufSkvL3JlYWR5IGVuZCAgXHJcbmZ1bmN0aW9uIGdldFVybFZhcnMoKXtcclxuICAgIHZhciB2YXJzPVtdLGhhc2g7dmFyIGhhc2hlcz13aW5kb3cubG9jYXRpb24uaHJlZi5zbGljZSh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCc/JykrMSkuc3BsaXQoJyYnKTtcclxuICAgIGZvcih2YXIgaT0wO2k8aGFzaGVzLmxlbmd0aDtpKyspe2hhc2g9aGFzaGVzW2ldLnNwbGl0KCc9Jyk7dmFycy5wdXNoKGhhc2hbMF0pO3ZhcnNbaGFzaFswXV09aGFzaFsxXX1cclxuICAgIHJldHVybiB2YXJzXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
