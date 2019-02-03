using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iGratify.Repositories;
using iGratify.Modals;

namespace iGratify.Service
{
   public class HomeService
    {
        HomeRepository repo = new HomeRepository();
        //private readonly HomeRepository _repo = null;
        //public HomeService()
        //{

        //}
        //public HomeService(HomeRepository repo)
        //{
        //    _repo = repo;
        //}
        public List<GetDDL> GetGenders()
        {
            return repo.GetGenderList();
        }
    }
}
