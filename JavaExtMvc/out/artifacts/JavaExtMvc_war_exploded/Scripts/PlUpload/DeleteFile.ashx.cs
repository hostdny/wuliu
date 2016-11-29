using Common.CommonClass;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebFrame.Areas.ExtFrame.resources.PlUpload
{
    /// <summary>
    /// DeleteFile 的摘要说明
    /// Create by sc 2015.10.30
    /// </summary>
    public class DeleteFile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResponse = "false";

            PostClass PostClass = new Common.CommonClass.PostClass();
            PostClass.PostData = context.Request["PostData"];

            dynamic dynamicPaths = Common.NewtonJsonHelper.Deserialize<dynamic>(PostClass.PostData, null);
            try
            {
                foreach (dynamic dynamicPath in dynamicPaths)
                {
                    string fileDirectory = HttpContext.Current.Server.MapPath("~/") + dynamicPath.ToString();
                    if (File.Exists(fileDirectory))
                        File.Delete(fileDirectory);
                }
                strResponse = "true";
            }
            catch (Exception ex)
            {
                strResponse = "false";
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write(strResponse);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}