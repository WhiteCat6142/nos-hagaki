"use client";

import { H1, H2, LinkWrapper, Ol, P, Ul } from "@/components/ArticleParts";

export default function Help() {
  return (
    <div className="break-phrase">
      <H1>ヘルプ</H1>

      <Ul>
        <li>
          <LinkWrapper href="#%E3%81%93%E3%82%8C%E3%81%AF%E4%BD%95">
            これは何？
          </LinkWrapper>
        </li>
        <li>
          <LinkWrapper href="#%E5%90%84%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%AE%E7%B0%A1%E5%8D%98%E3%81%AA%E8%AA%AC%E6%98%8E">
            各ボタンの簡単な説明
          </LinkWrapper>
        </li>
        <li>
          <LinkWrapper href="#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B">
            使ってみる
          </LinkWrapper>
        </li>
        <li>
          <LinkWrapper href="#%E5%88%B6%E9%99%90">制限</LinkWrapper>
        </li>
        <li>
          <LinkWrapper href="#%E3%81%99%E3%81%BF%E3%81%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">
            すみかについて
          </LinkWrapper>
        </li>
      </Ul>
      <H2 id="これは何">これは何？</H2>
      <Ol>
        <li>
          Nostr 公開鍵を現実の場所に変換して、疑似的な文通を行う Nostr
          クライアントです。
        </li>
        <li>
          距離に応じて時間がかかります。かかる時間は、コンテナ船の速度を参考にしています。
        </li>
      </Ol>
      <H2 id="各ボタンの簡単な説明">各ボタンの簡単な説明</H2>
      <P>ホーム：自分のプロフィールや書き込みが参照できます。</P>
      <P>郵便受け：自分が受け取ったメッセージが参照できます。</P>
      <P>設定：設定を変更できます。現状では、ログアウトができます。</P>
      <P>情報：このウェブサイトについて知ることができます。</P>
      <P>はがきを書く：メッセージの下書きを書くことができます。</P>
      <H2 id="使ってみる">使ってみる</H2>
      <Ol>
        <li>
          「はがきを書く」を押してみましょう。下書きを書くエディタが表示されます。
          <Ol>
            <li>初めて使う場合「ご注意」が出ます。読んでおきましょう。</li>
          </Ol>
        </li>
        <li>
          「お届け先を選ぶ」を押してみましょう。フォローしている人の一覧が出てきます。
          <Ol>
            <li>
              フォローしている人からお届け先を選ぶことができます。選んで、クリックしてみましょう。
            </li>
          </Ol>
        </li>
        <li>
          メッセージを書いてみましょう。
          <Ol>
            <li>
              いつ書いたのか、なんのクライアントを使ったのかなどの情報は自動的に追加されません。必要であれば、書いておいてください。
            </li>
            <li>
              最大 1200 字書くことができます。400 字詰めの原稿用紙 3 枚分です。
            </li>
          </Ol>
        </li>
        <li>
          書き終わったら、「確認」を押してみましょう。確認ページが表示されます。
          <Ol>
            <li>
              確認してみてください。公開してはいけない情報や、他者に不快感を与える内容がないか気を付けてください。
            </li>
            <li>お届け先が間違っていないか、気を付けてください。</li>
            <li>
              大丈夫そうであれば、「私は人間です」チャレンジに進んでください。
            </li>
          </Ol>
        </li>
        <li>
          「投函する」ボタンを押して、はがきを投函してみましょう。
          <Ol>
            <li>投函できた場合、「投函しました」ページへ遷移します。</li>
            <li>
              お届け予定日をお届け先に知らせておくことができます。知らせたい場合、「メッセージを送る」を押してみましょう。
            </li>
          </Ol>
        </li>
      </Ol>
      <H2 id="制限">制限</H2>
      <Ul>
        <li>
          投函は 1 時間につき 6
          回までできます。制限に達してしまったら、しばらく待ってから投函してみてください。
        </li>
        <li>
          以下の要素をすべて満たす場合、送信に失敗することがあります。これは、内容から算出される
          ID が同一であるためです。
          <Ul>
            <li>同一人物による書き込み</li>
            <li>同一人物への送信</li>
            <li>同じ日</li>
            <li>同一の内容</li>
          </Ul>
        </li>
      </Ul>
      <H2 id="すみかについて">すみかについて</H2>
      <Ul>
        <li>Nostr 公開鍵からランダムな場所が算出されます。</li>
        <li>
          表示される地域名は、ある時点での ISO3166
          に由来します。そのため、以下の状況があります。
          <Ul>
            <li>最新の情報が反映されていない場合</li>
            <li>各国家の主張と異なる場合</li>
          </Ul>
        </li>
      </Ul>
    </div>
  );
}