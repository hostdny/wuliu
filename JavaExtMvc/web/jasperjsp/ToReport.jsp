<%@ page import="net.sf.jasperreports.engine.*" %>
<%@ page import="net.sf.jasperreports.engine.util.*" %>
<%@ page import="net.sf.jasperreports.engine.export.*" %>
<%@ page import="net.sf.jasperreports.j2ee.servlets.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.pmcc.utils.SystemPropertyUtil" %>
<%@ page import="java.util.Date" %>
<%@ page import="com.pmcc.utils.DateUtil" %>
<%@ page import="com.pmcc.utils.StringUtil" %>

<input type=hidden name="test1" id="test1" value="<%= request.getParameter("fid") %>"/>
<%!
    String filename = "";
    String filecname = "";
    Map parameters = new HashMap();

    private void prepare(HttpServletRequest request) {
        String fileid = request.getParameter("fid");
        switch (Integer.valueOf(fileid)) {
            case 1: {
                filename = "examCard";
                filecname = "准考证号";
                parameters.put("BATCH_ID",  request.getParameter("batchId"));
                parameters.put("PHOTO_DIR", SystemPropertyUtil.getProperty("system.pic.path"));
                parameters.put("LOGO_DIR", request.getSession().getServletContext().getRealPath("/") + "jasper/");
                break;
            }
            case 2: {
                filename = "XXFBTJ";
                filecname = "信息发布统计";

                String sDates = request.getParameter("sDate");
                String eDates = request.getParameter("eDate");
                String title = StringUtil.toEncoding(request.getParameter("title"));
                if (!"null".equals(sDates)) {
                    Date sDate = DateUtil.StringToDate(sDates + " 00:00:00","yyyy-MM-dd HH:mm:ss");
                    parameters.put("sDate", sDate);
                }
                if (!"null".equals(eDates)) {
                    Date eDate = DateUtil.StringToDate(eDates + " 23:59:59","yyyy-MM-dd HH:mm:ss");
                    parameters.put("eDate", eDate);
                }
                if(!"".equals(title)){
                    parameters.put("title", "%" +title + "%");
                }
                break;
            }
            case 3: {
                filename = "FWTJ";
                filecname = "发文统计";
                String year = request.getParameter("year");
                String sendSql = "";
                if(!"".equals(year)){
                    sendSql = "DATE_YEAR ="+year;
                }else{
                    sendSql = "1=1";
                }
                parameters.put("sendSql", sendSql);
                break;
            }
            case 4: {
                filename = "FYTJ";
                filecname = "费用统计";
                String stateTime = request.getParameter("stateTime");
                String endTime = request.getParameter("endTime");
                String costType = request.getParameter("costType");
                String carNum = request.getParameter("carNum");
                String sDate = "";
                String eDate = "";
                String costSql1 = " AND DEL_FLAG = '0' ";
                String costSql2 = " AND 1=1 ";
                String costSql3 = " AND 1=1 ";

                if(!"".equals(stateTime) && !"".equals(endTime)){
                    sDate = stateTime + " 00:00:00";
                    eDate = endTime + " 23:59:59";
                    costSql1 = costSql1 + " AND COST_DATE BETWEEN "+sDate+" AND "+eDate;
                }else if (!"".equals(stateTime) && "".equals(endTime)) {
                    sDate = stateTime + " 00:00:00";
                    costSql1 = costSql1 + " AND COST_DATE > "+sDate;

                }else if (!"".equals(endTime) && "".equals(stateTime)) {
                    eDate = endTime + " 23:59:59";
                    costSql1 = costSql1 + " AND COST_DATE < "+eDate;
                }
                if (!"null".equals(costType)) {
                    costSql2 = " AND COST_TYPE = "+costType+" ";
                }
                if (!"".equals(carNum)) {
                    costSql3 = " AND CAR_NUM = "+carNum+" ";
                }
                parameters.put("costSql1", costSql1);
                parameters.put("costSql2", costSql2);
                parameters.put("costSql3", costSql3);
                break;
            }
            case 5: {
                filename = "SQTJ";
                filecname = "申请统计";
                String year = request.getParameter("year");
                String sendSql = "";
                if(!"".equals(year)){
                    sendSql = "CREATE_TIME ="+year;
                }else{
                    sendSql = "1=1";
                }
                parameters.put("sendSql", sendSql);
                break;
            }
            case 6: {
                filename = "ZCHZ";
                filecname = "资产汇总";
                parameters.put("ids", request.getParameter("ids"));
                break;
            }
            case 7: {
                // 按批次导出
                filename = "CJCXPC";
                filecname = "成绩查询";
                System.out.println("-------------" + request.getParameter("batchId"));
                parameters.put("batchId", request.getParameter("batchId"));
                break;
            }
            case 8: {
                // 按场次导出
                filename = "CJCXCC";
                filecname = "考试成绩";
                parameters.put("sessionId",  request.getParameter("sessionId"));
                break;
            }
            case 9: {
                // 按时间导出
                filename = "JYJLCX";
                filecname = "借阅记录查询";
                String sDates = request.getParameter("sDate");
                String eDates = request.getParameter("eDate");
                if (!"null".equals(sDates)) {
                    Date sDate = DateUtil.StringToDate(sDates + " 00:00:00","yyyy-MM-dd HH:mm:ss");
                    parameters.put("sDate", sDate);
                }
                if (!"null".equals(eDates)) {
                    Date eDate = DateUtil.StringToDate(eDates + " 23:59:59","yyyy-MM-dd HH:mm:ss");
                    parameters.put("eDate", eDate);
                }
                break;
            }
            case 10: {
                // 按场次导出
                filename = "YQJLCX";
                filecname = "逾期记录查询";
                String startTimes = request.getParameter("sDate");
                String endTimes = request.getParameter("eDate");
                if (!"null".equals(startTimes)) {
                    Date startTime = DateUtil.StringToDate(startTimes + " 00:00:00","yyyy-MM-dd HH:mm:ss");
                    parameters.put("startTime", startTime);
                }
                if (!"null".equals(endTimes)) {
                    Date endTime = DateUtil.StringToDate(endTimes + " 23:59:59","yyyy-MM-dd HH:mm:ss");
                    parameters.put("endTime", endTime);
                    parameters.put("bookState", "bookState <> 1");
                }
                break;
            }
            case 11: {
                // 图书信息维护
                filename = "TSXXWH";
                filecname = "图书信息维护";
                parameters.put("parentOid",  request.getParameter("parentOid"));
                break;
            }
            case 12: {
                // 廉政举报
                filename = "WJJB";
                filecname = "违纪举报";
                String startTimes = request.getParameter("sDate");
                String endTimes = request.getParameter("eDate");
                if (!"".equals(startTimes) && !"".equals(endTimes)) {
                    String sql = "";
                    startTimes = startTimes + " 00:00:00";
                    endTimes = endTimes + " 23:59:59";
                    sql = " CREATE_TIME > '"+startTimes + "' AND CREATE_TIME < '"+endTimes+"'";
                    parameters.put("sql", sql);
                }else{
                    parameters.put("sql", "1=1");
                }
                break;
            }
            case 13: {
                filename = "YGKQTJ";
                filecname = "员工考勤统计";

                String sDates = request.getParameter("sDate");
                String eDates = request.getParameter("eDate");
                if (!"null".equals(sDates)) {
                    Date sDate = DateUtil.StringToDate(sDates + " 00:00:00","yyyy-MM-dd HH:mm:ss");
                    parameters.put("sDate", sDate);
                }
                if (!"null".equals(eDates)) {
                    Date eDate = DateUtil.StringToDate(eDates + " 23:59:59","yyyy-MM-dd HH:mm:ss");
                    parameters.put("eDate", eDate);
                }
                break;
            }
            default: {
            }
        }
    }
%>
<%
    prepare(request);
    String type = request.getParameter("type");
    File reportFile = new File(application.getRealPath("/jasper/" + filename + ".jasper"));
    if (!reportFile.exists())
        throw new JRRuntimeException("error");
    response.setCharacterEncoding("UTF-8");
      /*       JasperReport jasperReport = (JasperReport)JRLoader.loadObject(reportFile.getPath()); */


    //  String url = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=KTCReport";
    //  Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
    //   Connection conn = DriverManager.getConnection(url,"sa","123456");

    //          String url = "jdbc:jtds:sqlserver://192.168.17.112:1433;DatabaseName=CJDT";

    //       String url = "jdbc:jtds:sqlserver://172.16.166.164:1433;DatabaseName=CJDT";

    //       Class.forName("net.sourceforge.jtds.jdbc.Driver").newInstance(); 
    //   Connection conn = DriverManager.getConnection(url,"sa","123456");
    //         Connection conn = DriverManager.getConnection(url,"sa","pmcc*123456");

    //      Connection conn = DriverManager.getConnection(url,"sa","123456");


    InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("application.properties");
    Properties pro = new Properties();
    pro.load(inputStream);
    String url = pro.getProperty("jdbc.url");
    String user = pro.getProperty("jdbc.username");
    String pwd = pro.getProperty("jdbc.password");
    Connection conn = DriverManager.getConnection(url, user, pwd);


    try {
        /*	   
           JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);
           
           JRHtmlExporter exporter = new JRHtmlExporter();

           StringBuffer sbuffer = new StringBuffer();

           session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);
          
           exporter.setParameter(JRExporterParameter.CHARACTER_ENCODING , "UTF-8"); 
           exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
           exporter.setParameter(JRExporterParameter.OUTPUT_WRITER, out);
           exporter.setParameter(JRHtmlExporterParameter.IMAGES_URI, "../servlets/image?image=");

           exporter.exportReport(); */


        if (type == null || type == "null" || type.equals("null")) {
            response.setCharacterEncoding("UTF-8");

            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile.getPath());
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);
            JRHtmlExporter exporter = new JRHtmlExporter();


            StringBuffer sbuffer = new StringBuffer();

            session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);

            exporter.setParameter(JRExporterParameter.CHARACTER_ENCODING, "UTF-8");
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRExporterParameter.OUTPUT_WRITER, out);
            exporter.setParameter(JRHtmlExporterParameter.IMAGES_URI, "../servlets/image?image=");
            exporter.setParameter(JRHtmlExporterParameter.SIZE_UNIT, "pt");
            exporter.exportReport();
        } else if (type.equals("pdf") || type == "pdf") {
            System.out.println("ssss" + type);
            byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath(), parameters, conn);
            response.setContentType("application/pdf");
            response.setContentLength(bytes.length);
            ServletOutputStream outStream = response.getOutputStream();
            response.setHeader("Content-Disposition", "attachment;filename=" + filecname + ".xls");

            outStream.write(bytes, 0, bytes.length);
            outStream.flush();
            outStream.close();
            out.clear();
            out = pageContext.pushBody();

        } else if (type.equals("excel")) {
            JRXlsExporter exporter = new JRXlsExporter();
            ByteArrayOutputStream oStream = new ByteArrayOutputStream();
            JasperPrint jasperPrint = JasperFillManager.fillReport(reportFile.getPath(), parameters, conn);
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, oStream);
            exporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
            exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
            exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
            exporter.exportReport();

            byte[] bytes = oStream.toByteArray();
            response.setContentType("application/vnd.ms-excel");
            response.setContentLength(bytes.length);
            ServletOutputStream ouputStream = response.getOutputStream();
            response.setHeader("Content-Disposition", "attachment;filename=" + filecname + ".xls");
            ouputStream.write(bytes, 0, bytes.length);
            ouputStream.flush();
            ouputStream.close();
            conn.close();
            out.clear();
            out = pageContext.pushBody();
        } else if (type.equals("word")) {
            JasperPrint jasperPrint = JasperFillManager.fillReport(application.getRealPath("/jasper/" + filename + ".jasper"), parameters, conn);
            ByteArrayOutputStream oStrEeam = new ByteArrayOutputStream();
            JRExporter exporter = new JRRtfExporter();
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, oStrEeam);
            exporter.exportReport();

            byte[] bytes = oStrEeam.toByteArray();
            if (bytes != null && bytes.length > 0) {
                response.reset();
                response.setContentType("application/msword;charset=GBK");
                response.setHeader("Content-Disposition", "attachment;filename=" + filecname + ".doc");

                response.setContentLength(bytes.length);
                ServletOutputStream ouputStream = response.getOutputStream();
                ouputStream.write(bytes, 0, bytes.length);
                ouputStream.flush();
                ouputStream.close();
                conn.close();
                out.clear();
                out = pageContext.pushBody();
            }
        } else {

        }


    } catch (Exception e) {
        e.printStackTrace();
    }
    try {
        if (conn != null) {
            conn.close();
        }
    } catch (Exception e) {
        e.printStackTrace();
    }


%>
