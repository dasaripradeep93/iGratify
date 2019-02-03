using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using iGratify.Service;

namespace iGratify.Controllers
{
   // [Authorize]
    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        // private readonly HomeService _service = null;
        //public HomeController()
        //{
        //}
        //public HomeController(HomeService service)
        //{
        //    _service = service;
        //}

        HomeService srv = new HomeService();

        [HttpGet, Route("getgender")]
        public IHttpActionResult GetGender()
        {
            try
            {
                
                return Ok(srv.GetGenders());
            }
            catch (Exception e)
            {
                return Ok(this.processException(e));
            }
        }
        private HttpResponseMessage processException(Exception exception)
        {
            var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.NotAcceptable);
            httpResponseMessage.Content = new StringContent(JsonConvert.SerializeObject(exception.Message), Encoding.UTF8, "application/json");
            httpResponseMessage.Headers.Add("ExceptionMessage", JsonConvert.SerializeObject(exception.Message));
            //httpResponseMessage.ReasonPhrase = itemSetting[0].SettingValue;
            return httpResponseMessage;
        }
    }
}
