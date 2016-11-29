package com.pmcc.core.web;

import com.pmcc.utils.AppUtils;
import com.pmcc.utils.OnlineUser;
import com.pmcc.utils.SystemPropertyUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class SessionFilter extends OncePerRequestFilter{
	
	private static final String[] DEFAULT_EXCLUDE_SUFFIXS = { "/","login.html","login.jsp","question.jsp","library.jsp",".js", ".css",".jpg", ".gif","png",".htm",".json" };
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// 不过滤的uri
				// 请求的uri
				String uri = request.getRequestURI();
				
				for (String suffix : DEFAULT_EXCLUDE_SUFFIXS) {
					if (uri.endsWith(suffix)){
						filterChain.doFilter(request,response);
						return;
					}
				}
						
				logger.debug("=======================URL:"+uri);
				// uri中包含background时才进行过滤
				if (!uri.endsWith("login.do") && !uri.endsWith("appLogin.do")) {
					// 是否过滤
					boolean doFilter = true;
					if (doFilter) {
						// 执行过滤
						// 从session中获取登录者实体
						OnlineUser user=(OnlineUser) AppUtils.getOnlineUser(WebUtils.getSessionId(request));
						if (null == user) {
							// 如果session中不存在登录者实体，则弹出框提示重新登录
							// 设置request和response的字符集，防止乱码
							request.setCharacterEncoding("UTF-8");
							response.setCharacterEncoding("UTF-8");
							response.setContentType("text/html;charset=GBK");
							PrintWriter out = response.getWriter();
							StringBuilder builder = new StringBuilder();
							builder.append("<script type=\"text/javascript\">");
							builder.append("alert('网页过期，请重新登录！');");
							String location = SystemPropertyUtil.getProperty("window.location");
							if(location == null){
								location = "http://localhost:8080/";
							}
							builder.append("window.top.location='" + location + "'");
							builder.append("';");
							builder.append("</script>");
							out.print(builder.toString());
						} else {
							// 如果session中存在登录者实体，则继续
							filterChain.doFilter(request, response);
						}
					} else {
						// 如果不执行过滤，则继续
						filterChain.doFilter(request, response);
					}
				} else {
					// 如果uri中不包含background，则继续
					filterChain.doFilter(request, response);
				}
			}

		
	}

