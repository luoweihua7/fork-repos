import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import hljsStyleGitHub from 'react-syntax-highlighter/dist/esm/styles/hljs/github';

import PowerShellAdbDumpCommand from './adb_dump.ps1?raw';
import ShellAdbDumpCommand from './adb_dump.sh?raw';

export function QMCv2AndroidInstructions() {
  return (
    <>
      <Text>
        你可能需要 <code>root</code> 或类似的访问权限。
      </Text>
      <Text>绝大多数情况下，这会导致你的安卓设备失去保修资格。</Text>

      <Accordion allowToggle mt="2">
        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在安卓手机端操作
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>
                使用具有 <code>root</code> 权限的文件浏览器，访问 <code>/data/data/com.tencent.qqmusic/databases/</code>
                {' 目录，将文件 '}
                <code>player_process_db</code> 复制到正常模式下用户可访问的目录（如下载目录）。
              </ListItem>
              <ListItem>提交该数据库文件。</ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在 PC 端操作（ADB / PowerShell）
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>
                确保 <code>adb</code> 命令可用。
                <br />
                💡 如果没有，可以
                <Link href="https://scoop.sh/#/apps?q=adb" isExternal color="blue.600">
                  使用 Scoop 安装 <ExternalLinkIcon />
                </Link>
                。
              </ListItem>
              <ListItem>启动终端并进入 PowerShell 7 环境。</ListItem>
              <ListItem>将安卓设备连接到电脑，并允许调试。</ListItem>
              <ListItem>
                粘贴执行下述代码。若设备提示「超级用户请求」请允许：
                <SyntaxHighlighter language="ps1" style={hljsStyleGitHub}>
                  {PowerShellAdbDumpCommand}
                </SyntaxHighlighter>
              </ListItem>
              <ListItem>
                提交当前目录下的 <code>player_process_db</code> 文件。
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在 Linux / Mac 系统下操作（ADB / Shell）
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>将安卓设备连接到电脑，并允许调试。</ListItem>
              <ListItem>
                粘贴执行下述代码。若设备提示「超级用户请求」请允许：
                <SyntaxHighlighter language="bash" style={hljsStyleGitHub}>
                  {ShellAdbDumpCommand}
                </SyntaxHighlighter>
              </ListItem>
              <ListItem>
                提交当前目录下的 <code>player_process_db</code> 文件。
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
