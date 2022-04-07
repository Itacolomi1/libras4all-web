using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace libras4All_web.Controllers
{
    public class EmailController: Controller 
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
