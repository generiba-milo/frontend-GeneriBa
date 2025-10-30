import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield, Clock, Users, DollarSign, Star, MessageCircle,
  CheckCircle2, AlertCircle, TrendingUp
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleSubmit } from "./api";
import { Description } from "@radix-ui/react-toast";
import Loading from "./loading";
import { useWallet } from "@solana/wallet-adapter-react";
import ManualWalletModal from "./manualmodel";
import { toast } from "sonner";
import DescriptionDialog from "@/components/dialogbox";

const GigDetail = () => {
  const { id } = useParams();
  const { connected, publicKey, disconnect } = useWallet();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assign, setAssign] = useState<Number>(0);

  const [data, setData] = useState({
    skills: "",
    uid: 0,
    title: "",
    assign: 0,
    description: "",
    payout: "",
    deadline: ""
  });

  type Data = {
    uid: Number,
    description: string;
    publickey: string;
    date: String
  };

  const [kdata, setkData] = useState<Data[]>([]);

  const dataFetch = async () => {
    const mData = await handleSubmit("sql", {
      "query": "SELECT * FROM gigs WHERE id = ?",
      "params": [id]
    });

    setData(mData.rows[0])
    setAssign(mData.rows[0].assign == null ? 0 : mData.rows[0].assign)

    if (localStorage.getItem("id") == mData.rows[0].uid) {
      const kData = await handleSubmit("sql", {
        "query": "SELECT * FROM apply WHERE gid = ?",
        "params": [id]
      });
      console.log(kData);
      setkData(kData.rows);
    }

    setLoading(false)
  }

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    loading ?
      <Loading /> :
      <div className="min-h-screen bg-background">
        <DescriptionDialog open={openDialog} setOpen={setOpenDialog} id={String(id)} publickey={String(publicKey)} />

        <div className="pt-10 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            { }
            <div className="mb-8 space-y-4 animate-fade-in">
              <div className="mb-8 flex items-center justify-between gap-4 animate-fade-in">
                <div className="flex flex-wrap gap-3">

                  {data.skills.split(",").map((e) => (
                    <Badge variant="outline">{e}</Badge>
                  ))}
                </div>
                {!connected ? (
                  <>
                    <button
                      onClick={() => setOpen(true)}
                      className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      <h1 className="font-display text-l font-bold">Connect Wallet</h1>
                    </button>
                    <ManualWalletModal open={open} onClose={() => setOpen(false)} />
                  </>
                ) : (
                  <button
                    className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    <h1 className="font-display text-l font-bold">
                      {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                    </h1>
                  </button>
                )}
              </div>
              <h1 className="font-display text-4xl font-bold">
                {data.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{data.deadline} Days</span>
                </div>

              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              { }
              <div className="lg:col-span-2 space-y-6">
                { }
                <Tabs defaultValue="description" className="animate-fade-in-up">
                  <TabsList className="bg-card border border-border">
                    <TabsTrigger value="description">Description</TabsTrigger>

                  </TabsList>
                  <TabsContent value="description" className="space-y-6 pb-5">
                    <Card className="p-6 border-border bg-card">
                      <h2 className="font-display font-semibold text-xl mb-4">Project Details</h2>
                      <div className="prose prose-invert max-w-none space-y-4">
                        <p className="text-muted-foreground">
                          {data.description}
                        </p>

                      </div>
                    </Card>
                  </TabsContent>

                </Tabs>


                {
                  Number(localStorage.getItem("id")) == data.uid && (assign == 0 ? kdata : kdata.filter((c) => c.uid === assign)).map((v) => (

                    <Card className="p-6 border-border bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <Link to={`/viewprofile/${v.uid}`}>
                          <h2 className="font-display font-semibold text-xl">
                            Proposal {v.date.toString().substring(0, 10)}
                          </h2>
                        </Link>
                        {
                          assign == 0 ?

                            <Button className="bg-purple-600 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={async () => {

                              await handleSubmit("sql", {
                                "query": "UPDATE gigs SET assign = ?  WHERE id = ?",
                                "params": [v.uid, id]
                              });

                              await handleSubmit("mintwork", {
                                "gig_id": id
                              });

                              toast.success("Assigned task", {
                                description: "NFT assigning"
                              })
                              setAssign(v.uid)


                            }}>
                              Accept
                            </Button> :


                            <Button className="bg-purple-600 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={async () => {

                              const d = await handleSubmit("sql", {
                                "query": "SELECT * FROM payout WHERE gid = ? AND uid = ?",
                                "params": [id, v.uid,]
                              });
                              console.log(d)

                              if (d.rows[0].status == "Started") {

                                await handleSubmit("transfer", {
                                  amount: d.rows[0].payout,
                                  transfer: v.publickey,
                                });

                              }

                               const c = await handleSubmit("sql", {
                                "query": "UPDATE payout SET status = ? WHERE gid = ?",
                                "params": ["Completed",id]
                                
                              });
                              console.log(c)

                              toast.success("Completed")
                            }}>
                              Payout
                            </Button>
                        }
                      </div>

                      <div className="prose prose-invert max-w-none space-y-4">
                        <p className="text-muted-foreground">
                          {v.description}
                        </p>
                      </div>
                    </Card>



                  ))
                }
              </div>
              { }
              <div className="space-y-6">
                { }
                <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent animate-fade-in">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Payout</div>
                      <div className="flex items-center gap-2">

                        <span className="text-4xl font-bold text-primary">{data.payout}</span>
                        <span className="text-muted-foreground">SOL</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Escrow Status</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          Funded
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform Fee</span>
                        <span>2% (SOL {Number(data.payout) * 2 / 100})</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>You Receive</span>
                        <span className="text-primary">SOL {Number(data.payout) - (Number(data.payout) * 2 / 100)}</span>
                      </div>
                    </div>
                    {
                      Number(localStorage.getItem("id")) !== data.uid && data.assign == null &&

                      <Button
                        onClick={() => {
                          if (connected) {

                            setOpenDialog(true)



                          } else {
                            toast.success('Connect Wallet First', {
                              description: `You can't apply for gig until wallet is connected`
                            });
                          }
                        }}
                        className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" size="lg">
                        Apply for Gig
                      </Button>
                    }

                  </div>
                </Card>
                { }

              </div>
            </div>
          </div>


        </div>

      </div>
  );
};
export default GigDetail;
