package com.pmcc.utils;

/**
 * Created by 王宾 on 2016/9/1.
 */

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DocConverter {
    private static final int environment = 1;// 环境1：windows,2:linux(涉及pdf2swf路径问题)
    private String fileString;
    private String outputPath = "";// 输入路径，如果不设置就输出在默认位置
    private String fileName;
    private File pdfFile;
    private File docFile;

    public DocConverter(String fileString) {
        ini(fileString);
    }

    /*
     * 重新设置 file @param fileString
     */
    public void setFile(String fileString) {
        ini(fileString);
    }

    /*
     * 初始化 @param fileString
     */
    private void ini(String fileString) {
        this.fileString = fileString;
        fileName = fileString.substring(0, fileString.lastIndexOf("."));
        docFile = new File(fileString);
        pdfFile = new File(fileName + ".pdf");
    }

    /*
     * 转为PDF @param file
     */
    private void doc2pdf() throws Exception {
        if (docFile.exists()) {
            if (!pdfFile.exists()) {
                OpenOfficeConnection connection = new SocketOpenOfficeConnection(8100);
                try {
                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date d1 = new Date();
                    long d1num = d1.getTime();
                    System.out.println("pdf开始转换");
                    connection.connect();
                    DocumentConverter converter = new OpenOfficeDocumentConverter(connection);

                    converter.convert(docFile, pdfFile);
                    // close the connection
                    connection.disconnect();
                    Date d2 = new Date();
                    long d2num = d2.getTime();
                    long diff = d2num - d1num;
                    long days = diff / 1000;
                    System.out.println("pdf转换成功,耗时：" + days+"秒");
                    System.out.println("****pdf转换成功，PDF输出：" + pdfFile.getPath() + "****");
                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            } else {
                System.out.println("****已经转换为pdf，不需要再进行转化****");
            }
        } else {
            System.out.println("****pdf转换器异常，需要转换的文档不存在，无法转换****");
        }
    }

    static String loadStream(InputStream in) throws IOException {
        int ptr = 0;
        //把InputStream字节流 替换为BufferedReader字符流 2013-07-17修改
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        StringBuilder buffer = new StringBuilder();
        while ((ptr = reader.read()) != -1) {
            buffer.append((char) ptr);
        }
        return buffer.toString();
    }

    /*
     * 转换主方法
     */
    public boolean conver() {
        if (environment == 1) {
            System.out.println("****pdf转换器开始工作，当前设置运行环境windows****");
        } else {
            System.out.println("****pdf转换器开始工作，当前设置运行环境linux****");
        }

        try {
            doc2pdf();
        } catch (Exception e) {
            // TODO: Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
