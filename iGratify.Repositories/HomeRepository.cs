using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Modals;
using iGratify.Repositories.Database;

namespace iGratify.Repositories
{
   public class HomeRepository
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
    }
}
