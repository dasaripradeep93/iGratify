using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace iGratify.Contracts
{

    [JsonObject(MemberSerialization.OptIn)]
    public class UserDetails
    {
        [JsonProperty("uid")]
        public string UserID { get; set; }

        [JsonProperty("pwd")]
        public string password { get; set; }

        [JsonProperty("fname")]
        public string FullName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("mno")]
        public string MobileNo { get; set; }

        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("profession")]
        public string Profession { get; set; }

        [JsonProperty("domain")]
        public string Domain { get; set; }

        [JsonProperty("industry")]
        public string Industry { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("otp")]
        public string OTP { get; set; }
    }
}
