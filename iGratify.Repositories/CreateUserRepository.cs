using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Modals;
using iGratify.Repositories.Database;
using System.Net.Http;
using System.Net;
using System.Web;

namespace iGratify.Repositories
{
    public class CreateUserRepository
    {
        private iGratifyEntities db = null;
        public List<GetDDL> GetGenderList()
        {
            List<GetDDL> genderList = new List<GetDDL>();
            using (db = new iGratifyEntities())
            {
                var data = db.MasterDatas.Where(a => a.Id_Type == "Gender");
                foreach (var items in data)
                {
                    GetDDL user = new GetDDL();
                    user.code = items.Code;
                    user.description = items.Description;
                    genderList.Add(user);
                }
            }
            return genderList;
        }


        public List<GetDDL> GetProfessionList()
        {
            List<GetDDL> professionList = new List<GetDDL>();
            using (db = new iGratifyEntities())
            {
                var data = db.MasterDatas.Where(a => a.Id_Type == "Profession");
                foreach (var items in data)
                {
                    GetDDL user = new GetDDL();
                    user.code = items.Code;
                    user.description = items.Description;
                    professionList.Add(user);
                }
            }
            return professionList;
        }
        public List<GetDDL> GetDomainList()
        {
            List<GetDDL> domainList = new List<GetDDL>();
            using (db = new iGratifyEntities())
            {
                var data = db.MasterDatas.Where(a => a.Id_Type == "domain");
                foreach (var items in data)
                {
                    GetDDL user = new GetDDL();
                    user.code = items.Code;
                    user.description = items.Description;
                    domainList.Add(user);
                }
            }
            return domainList;
        }

        public List<GetDDL> GetEducationList()
        {
            List<GetDDL> educationList = new List<GetDDL>();
            using (db = new iGratifyEntities())
            {
                var data = db.MasterDatas.Where(a => a.Id_Type == "Industry");
                foreach (var items in data)
                {
                    GetDDL user = new GetDDL();
                    user.code = items.Code;
                    user.description = items.Description;
                    educationList.Add(user);
                }
            }
            return educationList;
        }

        public void saveUserDetails(UserAccounts item)
        {
            using (db = new iGratifyEntities())
            {

                UserDetail tab = new UserDetail();
                tab.UserId = item.UserID;
                tab.Password = item.password;
                tab.FirstName = item.FullName;
                tab.Email = item.Email;
                tab.Gender = item.Gender;
                tab.MobileNo = item.MobileNo;
                tab.Profession = item.Profession;
                tab.Domain = item.Domain;
                tab.Industry = item.Industry;
                tab.Country = item.Country;

                db.UserDetails.Add(tab);
                db.SaveChanges();

            }
        }

        public int saveOTP(UserAccounts ua)
        {
            int result = 0;
            using (db = new iGratifyEntities())
            {
                try
                {
                    OTPMaster otp = new OTPMaster();
                    otp.UserId = ua.UserID;
                    otp.Email = ua.Email;
                    otp.Mobile = ua.MobileNo;
                    otp.OTP = ua.OTP;

                    db.OTPMasters.Add(otp);
                    db.SaveChanges();
                 return  result = 1;
                }
                catch (Exception e)
                {
                 return   result = -1;
                }
            }
        }

        public int validateOTP(UserAccounts ua) {
            UserAccounts uad = new UserAccounts();
            int result = 0;
            using (db = new iGratifyEntities()) {
                var data = db.spg_ValidateOTP1(ua.UserID, ua.Email, ua.MobileNo);
                foreach (var items in data)
                {
                    result = Convert.ToInt32(items.OTP);
                }
                
                return result;
            }
        }
    }
}
